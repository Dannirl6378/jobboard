import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

//supbase heslo JobBoard6378
//url https://wgxigmikjcvicsogsndu.supabase.co
//api: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneGlnbWlramN2aWNzb2dzbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MzU2OTQsImV4cCI6MjA3MTAxMTY5NH0.JFRbdS1RAPNOk9vtjeRVmA_T6iR23JePATPDW2PL1-k
/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgxigmikjcvicsogsndu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey) */