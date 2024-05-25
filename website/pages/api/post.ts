import type { NextApiRequest, NextApiResponse } from "next";
import tables, { sequelize } from "../../db/schema";
import { Model, Op } from "sequelize";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
        if(!req.body.item) return res.status(400).send({ status: "failed", errorc: 1, error: "Bad query for 'item'"});
        if(!req.body.method) return res.status(400).send({ status: "failed", errorc: 1, error: "Bad query for 'method'"});
        if(!req.body.amount) return res.status(400).send({ status: "failed", errorc: 1, error: "Bad query for 'amount'"});

        if(!(req.body.method=="ADD"||req.body.method=="REMOVE"||req.body.method=="ERR")) return res.status(400).send({ status: "failed", errorc: 1, error: "Bad query for 'data.method'"});
        //Change stock
        await tables.ItemStockTable.findOrCreate({where:{item:req.body.item}}).then((rows:[Model<any, any>, boolean])=>{
            if(rows[0]){
                if(req.body.method=="ADD"){
                    rows[0].increment('amount',{by:parseInt(req.body.amount)})
                } else if(req.body.method=="REMOVE"){
                    rows[0].decrement('amount',{by:parseInt(req.body.amount)})
                }
                tables.StockLogTable.create({item:req.body.item,method:req.body.method,amount:req.body.amount})
            }
            res.status(200).send({ status: "success", errorc: 0, error: ""})
        }).catch(()=>{
            tables.StockLogTable.create({item:'',method:'ERR',amount:0,extra:"Bad query came in"})
            res.status(200).send({ status: "failed", errorc: 2, error: "Database error"})
        })
        
	} else {
		return res
			.status(400)
			.send({
				status: "failed",
				errorc: 100,
				error: "This route doesn't support this method",
			});
		// Handle any other HTTP method
	}
}
