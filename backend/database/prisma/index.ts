import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllUsers() {
    const allUsers = await prisma.user.findMany()
    //console.log(allUsers)
  }
  //get the users favourite store
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

  let storeLocation=""!
  for(var store of favouritestore){
    storeLocation=store.location!
  }
  const amountSpent =await prisma.slip.findMany({
    where:{
      usersId:{
        in: userid
      },
      location: storeLocation
    },
    select:{
      total:true
    }
  })
let total=0;
for(var amount of amountSpent)
{
  total=total+amount.total;
}
  console.log(storeLocation)
  console.log(total)
}   

//the most expensive item 
async function getMostExpensiveItem(userid:number) {
  const mostExpensive = await prisma.slip.findMany({
    where:{
      usersId:{
        in:userid
      },
    },
    select:{
     transactionDate:true,
      items:{
        select:{
          itemPrice:true,
          data:{
            select:{
              item:true
            }
          }
        },
        orderBy:{
          itemPrice:"desc"
        },
      },
    },
 
   

   })
   let expensiveItem=0;
   let dataItem:string=""!
   for(var itemL of mostExpensive){
     let date = itemL.transactionDate;


     for(var it of itemL.items){
       if(it.itemPrice>expensiveItem)
       {
         expensiveItem=it.itemPrice;
         dataItem=it.data?.item!;
       }     
     }
    }
  console.log(dataItem)
  console.log(expensiveItem)
}  

  var userid=1
  getAllUsers()
  getfavouritestore(userid)
  getMostExpensiveItem(userid)

    .catch((e) => {
      throw e
    })
  
    .finally(async () => {
      await prisma.$disconnect()
    })