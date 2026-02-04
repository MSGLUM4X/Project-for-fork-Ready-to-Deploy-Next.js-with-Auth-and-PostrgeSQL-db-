"use server";

import {signIn} from "@/auth"
import { z } from 'zod';

const FormSchema = z.object({
    provider: z.string(),
    callbackUrl: z.string(),
})

export const signWithSS0 = async (
    _prevState: void,
    formData: FormData,
) => {

    const data = FormSchema.parse({
        provider: formData.get('provider'),
        callbackUrl: formData.get('callbackUrl'),
    })
    await signIn(data.provider, {
        redirectTo:data.callbackUrl,
    });

}