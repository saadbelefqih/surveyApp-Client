import { ReponseDetails } from './reponseDetails.model';

export class  Reponse{
    idReponse: number;
    reponsesDetails:ReponseDetails[]

    getReponseDetails(idQuestion:number):ReponseDetails{
        let repDetai:ReponseDetails;
        this.reponsesDetails.forEach((rD:ReponseDetails)=>{
            if(rD.question==idQuestion){
               repDetai=rD;
            }
        })
        return repDetai;
    }
    public addReponse(reponseDetaile:ReponseDetails,){
        let isfinded:boolean=false;
        if(this.getReponseDetails.length>0){
            this.reponsesDetails.forEach((rD:ReponseDetails)=>{
                if(rD.question==reponseDetaile.question){
                    rD.isOption1=reponseDetaile.isOption1;
                    rD.isOption2=reponseDetaile.isOption2;
                    rD.isOption3=reponseDetaile.isOption3;
                    rD.isOption4=reponseDetaile.isOption4;
                    isfinded=true;}
            })
        }
        if(!isfinded){
            this.reponsesDetails.push(reponseDetaile);
        }
    }

  };
