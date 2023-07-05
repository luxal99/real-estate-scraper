import axios, {AxiosResponse} from "axios";
import * as cheerio from 'cheerio'
import {ScraperDomain} from "../core/enum/ScraperDomain";
import {UrlType} from "../core/types/url.type";
import * as process from "process";

const realEstateMapped :any[]=[];

(async ()=>{
    await getRealEstates('https://www.nekretnine.rs/stambeni-objekti/stanovi/izdavanje-prodaja/prodaja/grad/nis/kvadratura/55_70/cena/80000_110000/lista/po-stranici/50/')
})()
async function getRealEstates(url:UrlType):Promise<void> {

    const realEstateResponse:AxiosResponse<string> = await axios.get(url)
    const $ = cheerio.load(realEstateResponse.data)
    const realEstates = $('.advert-list .offer');
    realEstates.each(function () {
        const title = $(this).find('.offer-body .offer-title').text().replace(/^\s+|\s+$/g, '')
        const price = $(this).find('.offer-body').find('.offer-price span:not(.offer-price--invert)').text().split('€')[0] + '€'
        const link = ScraperDomain.NEKRETNINE_RS + $(this).find('.offer-body').find('.offer-title a').attr('href')
        const picture = $(this).find('img').attr('data-src')
        realEstateMapped.push({title, price, link, picture})
    })

    const next:string = $('.next-article-button').attr('href')

    console.log(realEstateMapped)
}