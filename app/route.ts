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
    analysisRoutes:analysisRouteAndPaperRoutes,
    mockScores:mockScores
  })
}