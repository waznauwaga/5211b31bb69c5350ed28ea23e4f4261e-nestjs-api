import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
//var serviceAccount = process.env.fireapikey;
//var databaseURL = process.env.urldatabasefire;
@Injectable()
export class FirebaseService {
    
    constructor(){
      /*  admin.initializeApp({
            credential:admin.credential.cert(serviceAccount),
            databaseURL:databaseURL
        })*/
        
        

    }


    saveDataClientLog(data){
        
        const db= admin.firestore();
        let ref = db.collection('userlog').doc('rpemcampos@gmail.com');
        //ref.set({log:data.log})
        const doc= ref.get();
        doc.then(snapshot=>{
            if(snapshot.data()==undefined){
                let logArr = new Array(data.log);
                ref.set({
                    logArr:logArr
                });
            }else{
                let logArr = snapshot.data().logArr;
                logArr.push(data.log);
                ref.set({
                    logArr:logArr
                })
            }
        },error=>{
            console.log({errorMoco:error});
        })
        /*const allDocument = ref.get();
        allDocument.then(snapshot=>{
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
        })
        
        //return ref.add(user);*/
    }

}
