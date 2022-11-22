import bcrypt from "bcrypt";

const hashRotation = 10

export async function hashedPassword(password: string){
    return await bcrypt.hash(password, 10)
}