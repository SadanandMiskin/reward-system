const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const cron = require('node-cron');


const app = express()

//db config file
require('./config/db')


//db models
const adminModel = require('./model/adminmodel')
const userModel = require('./model/user')
const userImageModel = require('./model/usermodel')



app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'))


app.use(bodyParser.urlencoded({
    extended: false
}))




require('dotenv').config()
const {google} = require('googleapis')
const expressLayouts = require('express-ejs-layouts')
const { sheets } = require('googleapis/build/src/apis/sheets')

app.use(express.urlencoded({extended: true}))


//google API credentials --> the .env file is not working throws error  ->
//  (Error: error:1E08010C:DECODER routines::unsupported)


const clientEmail = "google-sheet-data@semiotic-nation-402211.iam.gserviceaccount.com"
const privateKey =  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdtpm/wHLmeS8M\nbmLopU/ygh2Sb+xNAIZn1rlM8p4LGibKVIqDOAaNvnAe445ahW4hH7srv7d0ac8S\nn3NnKLpvbcMALwevJU5z7EUb6Atl+DiKiLw734VvRmVcwUamyOTwoCRxT/iuwHME\nnpQeerE1BGZPYuT0+Ku3n2X4n3yc7mWzM3uRGYwVs3UpFJWjlJDXl9+kOke863wv\nVjYHR1xojao53cfEdqtKghhdh2wfC59UE9LeiDHZUjwf86HYpVkFTu/KmSjXb3Ax\nhVEBesTljQ+qjc6J7aTReS7d7oCW3e2Mk4gJcfwTGLSU77VdIjnlx8UjlcZJVvp6\nStP7e7kZAgMBAAECggEAIh+0PI0DT2LBD0uDExtRpQMKKvkUg8StUCJhjYihMX3D\nDtwj7ChfIqQl1kkeL+/W2EvpT5n3s7SBHWJqsdNaI2n4Wz3Rx8+mneZtPZCDhtii\nQzc6oynF0UHGBL+87bFh975upCXNhOIXANTe74lUdkgxatPW/jofzWcrxROc/scv\nDJ/bJzChFI9aPj6XGw6KUYzPMwlaojDlTIYA2M/u5xHPQLo/7IIB9imEMxntCnyA\nJY/x3dFPd8Nj2rfrD84KNl183jKnCmxu/tVs2GvWdo0Hv02y3ywEyrzL5Vxkp5FL\nAOJSdPHF1A5s+PQh8U1WwzdbVSrqDjd9AekVEY52QQKBgQDWz/uMfCNDpPdb4VUd\nLQ9IOZHnYBQI3vdj2spb6BavG/tMqFudkiseJ/zSP5wnz53hvUWzqA0thZSY2mUN\nEj6dJTxbhzGQU9VOWTEkUwYMY7ZycHomX+byk5/7evq739MpBffi3mAbUPOsVAWF\nDgz8DlkScj+6lupmRcXYWBGsJQKBgQC78+t2gEbMENOEj+ADzpesanpdqHH343NG\nFqvRej0H37tXYmXF10Um4E83A05FK12pVPGpZjqmks33ExVNEjTemmQff5Fisean\nYfY6ut1Oq4PjH9Y8QpldRIkjv9CQSb8c4H2wKHdKA5D5Y3xMX9mE4/We5YGtXVPl\nRtL+ML8M5QKBgGi4Wawh9FsMt93d2s1vYwzVq/A84Wd1surGBXKKkUxqerbjOE53\nrHd2DQU+J1UtHI2o5KrxmQMBJPDjPvIBW+7l8Se5n4r5o3ofdxp7Mu6lSZM+i/3b\nMM4+83X4fPVL5zgPhcnemMGYVEJFb69uqxvRrtCUS8cdvUWAbDPMs0jVAoGAbMMF\nqpkoXsYN4FPxacKO+nLTRIdJDA1Ok2xjGOEHmBrbqgGCqy2bEpgSvt7m2Bf0JxzE\niyZhIispjKQ6W1MBzR7CeYe0dcxEkO+bMPkZP4D43OF7c3uGi/Yw9cL1yckjEm7F\nzL5d6TKPHgF32CpPERto8v4UQGIVPkPxrK5AoBECgYA8jGKJSP2Bh+cvYdOxSlCp\nmatibX6/3AzUIoi1F6PJKffUNotelVV8PwWXEXur0GODtvm/vNOluTcQoqzDQxi8\nCyIfaehv8y5XDCSi+VRH2yH88D3Z29jvYpw51u2A4IcUHP0JhlmVKXERd0eiEfaN\ngHBmSZJp/GIRZVznxV4W5w==\n-----END PRIVATE KEY-----\n"
const spreadsheetId = "1WCAl_5lcxTPp7PDs_xuVHCNWhHJVPeYyFAios91PjGk"

//function for creating a google spreadsheet instance
async function accessGoogleSheet() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    })

    const client = await auth.getClient()
    const sheets = google.sheets({version: "v4" ,auth})

    async function readSheetData() {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "Sheet1!A1:E2"
        })
        const values = response.data.values
        console.log(values)
    }

    app.post('/adminpost', upload.single('image'), async (req, res) => {
        
        
        const newUpload = new adminModel({
            name: req.body.name,
            link: req.body.link,
            image: {
                imageName: req.file.filename,
                path: req.file.path
            },
            point: parseInt(req.body.point),
            category: req.body.category,
            subCategory: req.body.subCategory
    
        })
        try {
            await newUpload.save()
            await writeSheetData(req.body)
    
           
    
            console.log('uploaded')
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err)
        }
    
    })
    
    
    async function writeSheetData(value){
        console.log(value)
        const values = [
            [
                value.name,
                value.category,
                value.point
            ]
        ]
        const resource = {
            values
        }
        console.log(resource)
    
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1!A3:E2",
            valueInputOption: "USER_ENTERED",
            resource
        })
        console.log(response.data.updatedCells)
        readSheetData()
    }
    
}



app.use(session({
    secret: 'Sadanandmiskin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}))

//multer storage
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({
    storage
})

const Auth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else res.redirect('/login')
}

const isClient = (req, res, next) => {
    if (req.session.isClient) {
        next()
    } else res.redirect('/login')
}
app.get('/' ,(req,res)=>{
    res.redirect('/login')
})
app.get('/login', (req, res) => {
    res.render('login')
})

var userr = ""
app.post('/login', async (req, res) => {
    const {
        name,
        pass
    } = req.body
    if (name == process.env.admin && pass == process.env.pass) {
        req.session.isAuth = true
        return res.redirect('/dashboard')
    } else {
        const usr = await userModel.findOne({
            name
        })
        if (usr) {
            req.session.isClient = true
            userr = usr
            req.session.usr = usr
            
            return res.redirect('/userdashboard')

        } else res.redirect('/login')
    }

})



app.get('/dashboard', Auth, async (req, res) => {
    const userApps = await userImageModel.find()
    const appsList = [...userApps]
   

   
//    if(adminm.image == apps.adminImage && adminm.point == userm.points){
//     return res.render('admindashboard' , {
//         a: true,
//         userupload: appsList
//     })
//    }
    res.render('admindashboard', {
        userupload: appsList,
    })

})

app.get('/admin' ,Auth, async(req,res)=>{
    const apps = await adminModel.find()
    const appsList = [...apps]
   
    res.render('admin', {
        userupload: appsList
    })
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login')
    })
})

//admin uploadss










var msg = ""

app.get('/register', (req, res) => {
    res.render('register', {
        msg: msg
    })

})
app.post('/register', async (req, res) => {
    const {
        name,
        email,
        pass
    } = req.body
    const usr = await userModel.findOne({
        email
    })
    if (usr) {
        return msg = "User Already Exists"
    } else {
        const newUser = new userModel({
            name: name,
            email: email,
            pass: pass,
            points: 0
        })

        await newUser.save()
        console.log('newUser added')
        return res.redirect('/login')
    }
})

var messages = ""
app.get('/profile', isClient, async (req, res) => {
    console.log(req.session.usr)
    res.render('userprofile', {
        userr: req.session.usr
    })

})
app.get('/userdashboard', isClient, async (req, res) => {
    const apps = await adminModel.find()
    const appsList = [...apps]
    const userapps = await userImageModel.find({
        userId: req.session.usr._id
    });
    
    
    res.render('client', { appsList: appsList, userr: userr, useruploads: userapps });
    

})
var post = ""
app.post('/userupload/:id', async (req, res) => {
    post = await adminModel.findById(req.params.id)
    res.redirect('/userupload')

})

app.get('/userupload', isClient, async (req, res) => {
    
    res.render('userupload', {
        post,
        messages: messages
    })
})



app.post('/useruploadimage/:id', upload.single('image'), async (req, res) => {

    const adminUploaded = await adminModel.findById(req.params.id)
    // const user = await userModel.find()
    
    const userUploadImage = new userImageModel({
        userId: req.session.usr._id,
        userName: req.session.usr.name,
        userEmail: req.session.usr.email,
        userImage: {
            imageName: req.file.filename,
            path: req.file.path
        },
        appName: adminUploaded.name,
        adminImage: {
            imageName: adminUploaded.image.imageName,
            path: adminUploaded.image.path
        },
        point: adminUploaded.point


    })
    await userUploadImage.save()
    messages = "Uploaded Successfully"
    console.log('user successfully image upload')
    res.redirect('/userdashboard')
})


app.get('/clientuploaded', isClient, async (req, res) => {
   
    const userupload = await userImageModel.find({
        userId: req.session.usr._id
    })
    
    
    res.render('clientuploaded', {
        userupload: userupload
    })
})


app.post('/updatepoints/:id', async (req, res) => {
    const appId = req.params.id

    const app = await userImageModel.findById(appId)
    const pointsToAdd = app.point
    const userId = app.userId
     await userImageModel.findOneAndUpdate({_id: appId}, {$set: {
        approve: true
    }})
    


    //const userId = appId


    const user = await userModel.findById(userId)
    user.points += pointsToAdd
    await user.save()
    
    res.redirect('/dashboard')


    

})

app.listen(3000, () => {
    console.log('Server is listening')
})

accessGoogleSheet()