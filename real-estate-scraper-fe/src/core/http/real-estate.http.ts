import axios, { AxiosResponse } from "axios";
import { RealEstateQuery } from "../models/query/RealEstateQuery.ts";
import { RealEstate } from "../models/real-estate/real-estate.model.ts";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const REAL_ESTATES = "/real-estates";
export const getRealEstates = async (
  realEstateQuery: RealEstateQuery
): Promise<AxiosResponse<RealEstate[]>> => {
  return axiosInstance.get(REAL_ESTATES, {
    params: { q: JSON.stringify(realEstateQuery) },
  });
};

export const enterNewest = async (): Promise<AxiosResponse<RealEstate[]>> => {
  return axiosInstance.post(REAL_ESTATES);
};
