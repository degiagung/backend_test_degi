const express       = require('express')
const bodyparser    = require('body-parser')
const swagger       = require('swagger-ui-express') 
const db            = require('./database/connection')
const helperreq     = require('./helper/helper')
const { specs, swaggerUi } = require('./swagger');
const app           = express()
const port          = 4000
const helper        = new helperreq();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/borrows', (req, res) => {
    // console.log(req.body);
    const book   = req.body.code_book ;
    const member = req.body.code_member ;
    //  process.exit()
    const attr   = 'book,member,date_start,date_finish' ;
    const values = "'"+book+"','"+member+"',DATE_FORMAT(NOW(),'%Y-%m-%d %h:%i:%s'),DATE_FORMAT(NOW(),'%Y-%m-%d %h:%i:%s') + interval 7 day";


    const sqlbook= "SELECT * FROM book WHERE code = '"+book+"'";
    db.query(sqlbook, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length <= 0){
            helper.response(helper.res_failed,result,'Buku tidak ditemukan',res);
            process.exit()
        }else{
            if(result[0]['stock'] == 0){
                helper.response(helper.res_failed,result,'Stock buku tidak tersedia',res);
                process.exit()
            }
        }
    })

    const sqlmember= "SELECT * FROM member WHERE code = '"+member+"'";
    db.query(sqlmember, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length == 0){
            helper.response(helper.res_failed,result,'Member tidak ditemukan',res);
            process.exit()
        }
    })

    const sqlcek2= "SELECT * FROM borrow WHERE member = '"+member+"' and date_return is null";
    db.query(sqlcek2, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length >= 2){
            helper.response(helper.res_failed,null,'Members may not borrow more than 2 books',res);
            process.exit()
        }
    })

    const sqlcek1= "SELECT * FROM book bu left join borrow bo on bu.code = bo.book WHERE book = '"+book+"' and date_return is null";
    db.query(sqlcek1, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,null,error,res);
            process.exit()
        }
        
        if(result.length >= 1){
            if(result[0]['stock'] == 0){
                helper.response(helper.res_failed,null,'Borrowed books are not borrowed by other members',res);
                process.exit()
            }
        }
    })

    const sqlcekpen= "SELECT date_penalty + interval 3 day FROM member where date_penalty + interval 3 day >= now() and code='"+member+"' and date_penalty is not null";
    db.query(sqlcekpen, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,null,error,res);
            process.exit()
        }
        
        if(result.length >= 1 ){
            helper.response(helper.res_failed,null,'Member is being penalized',res);
            process.exit()
        }
    })

    const save   = "INSERT INTO borrow ("+attr+") VALUES ("+values+")";
    db.query(save, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            db.query("UPDATE book set stock = stock-1 where code ='"+book+"'")

            process.exit()
        }

        if (result.insertId) {
            helper.response(helper.res_success,result,helper.info_success,res);
        }
    })

    

})

app.post('/return', (req, res) => {
    // console.log(req.body);
    const book   = req.body.code_book ;
    const member = req.body.code_member ;



    const sqlcek2= "SELECT *,DATE_FORMAT(date_finish,'%Y-%m-%d %h:%i:%s') as finish,DATE_FORMAT(NOW(),'%Y-%m-%d %h:%i:%s') as now FROM borrow WHERE member = '"+member+"' and book = '"+book+"' and date_return is null";
    db.query(sqlcek2, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length >= 1){
    
            if(result[0]['finish'] < result[0]['now']){
                helper.response(helper.res_success,null,'the book is returned after more than 7 days, the member will be subject to a penalty',res);
                 db.query("UPDATE member set date_penalty = now() where code ='"+member+"'")
                 db.query("UPDATE borrow set date_return = now() where member ='"+member+"' and book ='"+book+"'")
                process.exit()
            }else{
                 helper.response(helper.res_success,null,'SUCCESS RETURN',res);
                 db.query("UPDATE borrow set date_return = now() where member ='"+member+"' and book ='"+book+"'")
                 db.query("UPDATE book set stock = stock+1 where code ='"+book+"'")

            }
        }else{
            helper.response(helper.res_failed,null,'The book borrowed by the member is not suitable or not found',res);
            process.exit()

        }
    })

    

    

})

app.get('/checkbook', (req, res) => {
    // console.log(req.body);
    const book   = req.body.code_book ;
    const member = req.body.code_member ;
    
    const sqlcek= `
        SELECT 
            * 
        FROM 
            book bo
        ORDER BY code,title asc `;
    db.query(sqlcek, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length >= 1){
            helper.response(helper.res_success,result,'OK',res);
        }
    })

})
app.get('/checkmember', (req, res) => {
    // console.log(req.body);
    const book   = req.body.code_book ;
    const member = req.body.code_member ;
    
    const sqlcek= `
        select 
            mb.code,mb.name,mb.date_penalty ,count(bo.id) as borrowed_book
        from 
            member mb 
            LEFT JOIN borrow bo ON mb.code = bo.member AND bo.date_return is null 
        GROUP BY mb.code ORDER BY mb.code,mb.name asc,count(bo.id) desc`;
    db.query(sqlcek, (error, result) =>{
        if (error){
            helper.response(helper.res_failed,result,error,res);
            process.exit()
        }
        
        if(result.length >= 1){
            helper.response(helper.res_success,result,'OK',res);
        }
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

