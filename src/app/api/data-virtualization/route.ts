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

    const response = await axios.get(`${process.env.API_URL}/project-virtualization/665e06de5108ea7605d7cf49`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token?.accessToken}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg1MzUxMDIsInVzZXJfaWQiOiI2NjU0MzY3MWY3YmNiNTIxOTIzZjFiMjcifQ.NkmW4zqS_PdU8yc8YdiTTKGHA3xX4GOx6kGR1c-5tCg`,
      },
    });

    // console.log(response.data.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
