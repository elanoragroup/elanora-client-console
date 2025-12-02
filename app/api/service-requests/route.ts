import { NextRequest, NextResponse } from 'next/server'
import { serviceRequestService } from '@/lib/database'

export async function GET() {
  try {
    const result = await serviceRequestService.getServiceRequests()
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ requests: result.data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()
    const result = await serviceRequestService.createServiceRequest(requestData)
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ request: result.data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
