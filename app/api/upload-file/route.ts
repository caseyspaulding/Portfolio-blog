// app/api/upload-file/route.ts
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/utils/aws";

export async function POST ( request: Request )
{
  try
  {
    const { fileName, fileContent } = await request.json();

    const params = {
      Bucket: "your-bucket-name",
      Key: fileName,
      Body: fileContent,
    };

    const command = new PutObjectCommand( params );
    const result = await s3Client.send( command );

    return NextResponse.json( { message: "File uploaded successfully", result } );
  } catch ( error: unknown )
  {
    return NextResponse.json(
      { message: "Failed to upload file", error },
      { status: 500 }
    );
  }
}
