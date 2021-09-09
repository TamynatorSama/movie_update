var express = require('express')

const app = express()


const axios = require('axios')

const cheerio = require('cheerio')


const e = require('express')

const url = 'https://screenrant.com/movie-news/'

async function fetch (){
    let result = [];
    try{
        const res = await axios.get(url).then(res=>{
            const html = res.data
            // console.log(html)
            const $ = cheerio.load(html)
                $(".browse-clip").each((i,el)=>{
                const title = $(el).find(".bc-title").text().trim()
                const link = $(el).find(".bc-title-link").attr('href')
                // const discription = $(el).find(".bc-excerpt").text()
                // const details = $(el).find(".bc-details").text()
                const pics = $(el).find(".responsive-img source").data()
                result.push({
                    title,
                    link:`https://screenrant.com/${link}`,
                    pics,
                    // discription,
                    // details
                } );
                
                
            })

        }).catch(err=>{
            console.log(err)

        })
        
    }
    catch (err){
        console.log(err)
    }
    return result; 
}
// fetch()
app.get('/', async (req,res) =>{
    let a = await fetch()
    res.json(a)
})

app.listen(process.env.PORT || 5000,()=>{
    console.log('connected to port 3000')
})
