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

async function getMostSpentATStore(userid:number)
{
  const mostExpensive = await prisma.slip.findMany({
    where:{
      usersId:{
        in:userid
      }
    },
    select:{
      location:true,
      total:true
    }
  })
  let mostspent=0;
  let store:string=""!;
  for(var itemL of mostExpensive){
    if(itemL.total>mostspent)
    {
      mostspent=itemL.total;
      store=itemL.location!;
    }
  }
  console.log(mostspent);
  console.log(store);
}

async function getWeeklyExpenditure(userid:number)
{
  const date1= new Date()
  const lastweek=date1.setDate(date1.getDate()-7);
  const date2= new Date()
  const otherWeek=date2.setDate(date2.getDate()-14)
   
   const weeklyExpenditure = await prisma.slip.findMany({
     where:{
       usersId:userid,  
     },
     select:{
       transactionDate:true,
       total:true
     }
   })
   let recentWeek=0;
   let previousWeek=0;
   for(var weekly of weeklyExpenditure)
   {
    if(weekly.transactionDate.toISOString()>=date1.toISOString())
    {
      recentWeek=recentWeek+weekly.total;
    }
    else if(weekly.transactionDate.toISOString()>=date2.toISOString())
    {
      previousWeek=previousWeek+weekly.total;
    }
  }
  console.log(recentWeek)
  console.log(previousWeek)
} 

async function getMonthlyExpenditure(userid:number)
{
  const date1= new Date()
  const lastMonth=date1.setDate(date1.getDate()-4*7);
  const date2= new Date()
  const otherMonth=date2.setDate(date2.getDate()-8*7)
   
   const MonthlyExpenditure = await prisma.slip.findMany({
     where:{
       usersId:userid,  
     },
     select:{
       transactionDate:true,
       total:true
     }
   })
   let recentMonth=0;
   let previousMonth=0;
   for(var weekly of MonthlyExpenditure)
   {
    if(weekly.transactionDate.toISOString()>=date1.toISOString())
    {
      recentMonth=recentMonth+weekly.total;
    }
    else if(weekly.transactionDate.toISOString()>=date2.toISOString())
    {
      previousMonth=previousMonth+weekly.total;
    }
  }
  console.log(recentMonth)
  console.log(previousMonth)
} 

  var userid=1
  getAllUsers()
  getfavouritestore(userid)
  getMostExpensiveItem(userid)
  getMostSpentATStore(userid)
  getWeeklyExpenditure(userid)
  getMonthlyExpenditure(userid)
    .catch((e) => {
      throw e
    })
  
    .finally(async () => {
      await prisma.$disconnect()
    })