import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await axios.get(`${process.env.API_URL}/project/data-definitions/question-type`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token?.accessToken}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY1NDM2NzFmN2JjYjUyMTkyM2YxYjI3In0.Tun6FUY-xT2cGulzPB_mnzrhyhybqtrgyauPZcnGq8Y`,
      },
    });

    console.log(response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
