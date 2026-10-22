import { NextRequest, NextResponse } from "next/server";

interface AnalysisAndPyqRoute{
  analysisRoute:string,
  pyqRoute:string
}
interface MockScores {
  date:string,
  score:number
}
const mockScores =[{
  date:"22-10-2026",
  score:64
}]
const analysisRouteAndPaperRoutes :AnalysisAndPyqRoute[] = [{
  analysisRoute:"/analysis/240409",
  pyqRoute:"/20240409"
}]
export async function GET(req: NextRequest) {
  return NextResponse.json({
    success:true,
    creater:"Aditya Rawat",
    excelSheet:["https://1drv.ms/x/c/5B4803206635AF47/IQAT7sot5qxXSZ1bHtdDdesdAdv0VL4PC3LXrxnGw-deXY4?e=Umlv7w","https://excel.cloud.microsoft/open/onedrive/?docId=5B4803206635AF47%21s2dcaee13ace649579d5b1ed74375eb1d&driveId=5b4803206635af47"],
    analysisRoutes:analysisRouteAndPaperRoutes,
    mockScores:mockScores
  })
}