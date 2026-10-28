import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { initialProducts } from '../../src/data/products.js';
const prisma=new PrismaClient();
try{
  for(const p of initialProducts){await prisma.product.upsert({where:{id:p.id},update:{name:p.name,category:p.category,price:p.price,oldPrice:p.oldPrice||0,rating:p.rating||5,reviews:p.reviews||0,badge:p.badge||'',image:p.image,description:p.description||'',stock:20,isActive:true},create:{id:p.id,name:p.name,category:p.category,price:p.price,oldPrice:p.oldPrice||0,rating:p.rating||5,reviews:p.reviews||0,badge:p.badge||'',image:p.image,description:p.description||'',stock:20}});}
  const email=process.env.ADMIN_EMAIL?.toLowerCase();const password=process.env.ADMIN_PASSWORD;
  if(email&&password){if(password.length<14)throw new Error('ADMIN_PASSWORD must be at least 14 characters.');const passwordHash=await bcrypt.hash(password,12);await prisma.user.upsert({where:{email},update:{name:process.env.ADMIN_NAME||'NEXORA Administrator',passwordHash,role:'ADMIN',isActive:true},create:{name:process.env.ADMIN_NAME||'NEXORA Administrator',email,passwordHash,role:'ADMIN'}});console.log(`Administrator provisioned: ${email}`);}else console.log('ADMIN_EMAIL/ADMIN_PASSWORD not set; skipped admin account creation.');
  console.log(`Seeded ${initialProducts.length} catalogue products.`);
}catch(e){console.error(e);process.exitCode=1;}finally{await prisma.$disconnect();}
