import prisma from '@/lib/prisma';

export const findUniqueUser = async (email:string) : Promise<{success:boolean, id?:string}> => {

    try  {
        const id = await prisma.user.findUnique({
            where:{
                email:email
            },
            select:{
                id:true
            }
        })
        if(!id){
            return {success:false}
        }
        return {success:true,id:id.id}
    } catch (err){
        return {success:false}
    }
}

export const createUser = async (email:string) : Promise<{success:boolean, id?:string}> => {

    try  {
        const id = await prisma.user.create({
            data: {
                email: email,
            },
            select:{
                id:true,
            }
        })
        if(!id){
            return {success:false}
        }
        return {success:true,id:id.id}
    } catch (err){
        return {success:false}
    }
}