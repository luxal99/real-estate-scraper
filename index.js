"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const express = require("express");
let realEstateTitles = [];
const baseUrl = 'https://www.nekretnine.rs/stambeni-objekti/stanovi/izdavanje-prodaja/prodaja/grad/nis/kvadratura/55_70/cena/80000_110000/lista/po-stranici/50/';
const domainName = 'https://www.nekretnine.rs';
const app = express();
app.listen(3000, () => {
    console.log('STARTED');
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getRealEstates().then(() => {
        res.send(realEstateTitles);
    });
}));
function getRealEstates(url = baseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const realEstateResponse = yield axios_1.default.get(url);
        const $ = cheerio.load(realEstateResponse.data);
        // const titles = $('.offer-title').text().split('\n').filter((x) => x.replace(/\s/g, '').length).map((x) => x.replace(/^\s+|\s+$/g, ''))
        const realEstates = $('.advert-list .offer');
        realEstates.each(function () {
            const title = $(this).find('.offer-body .offer-title').text().replace(/^\s+|\s+$/g, '');
            const price = $(this).find('.offer-body').find('.offer-price span:not(.offer-price--invert)').text().split('€')[0] + '€';
            const link = domainName + $(this).find('.offer-body').find('.offer-title a').attr('href');
            const picture = $(this).find('img').attr('data-src');
            console.log(picture);
            realEstateTitles.push({ title, price, link, picture });
        });
        // realEstateTitles = [...realEstateTitles, ...titles]
        const next = $('.next-article-button').attr('href');
        // if (next) {
        //     await getRealEstates(domainName + next)
        // } else {
        //     return realEstateTitles
        // }
    });
}
