import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllUsers() {
    const allUsers = await prisma.users.findMany()
    //console.log(allUsers)
  }
async function getfavouritestore(userid:number) {
  const favouritestore = await prisma.slip.groupBy({
    by: ['location'],
    where: {
      usersId: {
        in: [userid],
      },
    },
    _count: {
      location:true
    },
    take:1,
    orderBy:{
      _count:{
        location:'desc'
      }
    }
    
   
  })
  console.log(favouritestore)
  }     
  async function getMostExpensiveItem() {
    const mostExpensive = await prisma.item.findMany({
      take:1,
   
      orderBy:{
        itemPrices:"desc"
      }
      
     
    })
    console.log(mostExpensive)
    }  
    async function getCheapestItem() {
      const cheapestItem = await prisma.item.findMany({
        take:1,
     
        orderBy:{
          itemPrices:"asc"
        }
        
       
      })
      console.log(cheapestItem)
      }  

  var userid=1
  getAllUsers()
  getfavouritestore(userid)
  getMostExpensiveItem()
  getCheapestItem()
    .catch((e) => {
      throw e
    })
  
    .finally(async () => {
      await prisma.$disconnect()
    })