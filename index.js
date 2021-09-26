var express = require('express')

const app = express()
const port = process.env.PORT || 3000

const axios = require('axios')

const cheerio = require('cheerio')
const e = require('express')

const url = 'https://screenrant.com/movie-news/'
const url2 = 'https://www.rottentomatoes.com/browse/upcoming' 

async function fetchMov (){
    let upcomingMovies = [];
    try{
        const res = await axios.get(url2).then(res=>{
            const newHtml = res.data

            const $1 = cheerio.load(newHtml)
            $1(".media-list__item").each((i,elem)=>{
                const imgLink = $1(elem).find(".media-list__poster").attr("src")
                const movTitle = $1(elem).find(".media-list__title").text()
                const date = $1(elem).find(".media-list__release-date").text()
                //const link1 = $1(elem).find(".media-list__movie-info a")
                upcomingMovies.push({
                    movTitle,
                    imgLink,
                    date
                }) 
            })
        })
    }
    catch(err){
        console.log(err)
    }
    return upcomingMovies
}

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
                const pics = $(el).find(".responsive-img source").data()
                result.push({
                    title,
                    link:`https://screenrant.com/${link}`,
                    pics,
                } );
                
                // console.log(result)
            
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

app.get('/upcoming', async (req,res)=>{
    let b = await fetchMov()
    res.json(b)
})

app.listen(process.env.PORT || 3000,()=>console.log(`connected to ${port}`))
