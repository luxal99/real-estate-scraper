import axios from "axios";
import * as cheerio from 'cheerio'
import express = require("express")
import {Request, Response} from "express";

let realEstateTitles: any[] = []
const baseUrl = 'https://www.nekretnine.rs/stambeni-objekti/stanovi/izdavanje-prodaja/prodaja/grad/nis/kvadratura/55_70/cena/80000_110000/lista/po-stranici/50/';
const domainName = 'https://www.nekretnine.rs';

const app = express()

app.listen(3001, () => {
    console.log('STARTED')
})

app.get('/', async (req: Request, res: Response) => {
    getRealEstates().then(() => {
        res.send(realEstateTitles)
    })
})

async function getRealEstates(url = baseUrl) {

    const realEstateResponse = await axios.get(url)
    const $ = cheerio.load(realEstateResponse.data)
    // const titles = $('.offer-title').text().split('\n').filter((x) => x.replace(/\s/g, '').length).map((x) => x.replace(/^\s+|\s+$/g, ''))
    const realEstates = $('.advert-list .offer');
    realEstates.each(function () {
        const title = $(this).find('.offer-body .offer-title').text().replace(/^\s+|\s+$/g, '')
        const price = $(this).find('.offer-body').find('.offer-price span:not(.offer-price--invert)').text().split('€')[0] + '€'
        const link = domainName + $(this).find('.offer-body').find('.offer-title a').attr('href')
        const picture = $(this).find('img').attr('data-src')
        console.log(picture)
        realEstateTitles.push({title, price, link, picture})
    })
    // realEstateTitles = [...realEstateTitles, ...titles]

    const next = $('.next-article-button').attr('href')

    if (next) {
        await getRealEstates(domainName + next)
    } else {
        return realEstateTitles
    }
}
