import type { NextApiRequest, NextApiResponse } from "next";
import tables, { sequelize } from "../../db/schema";
import { Op } from "sequelize";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		if (req.query.type == undefined) return res.status(400);
		if (req.query.type == "stock") {
			if(req.query.item=='all'){
				const query = await tables.ItemStockTable.findAll({});
				res.status(200).send(query);
			} else{
				const query = await tables.ItemStockTable.findOne({
					where: { item: req.query.item },
				});
				res.status(200).send(query);
			}
		} else if (req.query.type == "log") {
			//Get logs between dates
			const fromtime =
				req.query.from != undefined
					? new Date(req.query.from as string)
					: new Date(0);
			const tiltime =
				req.query.until != undefined
					? new Date(req.query.until as string)
					: new Date(Date.now());
			const options: any = {
				where: { createdAt: { [Op.between]: [fromtime, tiltime] } },
				order: [['createdAt','DESC']]
			};
			if (req.query.item) {
				options.where = { ...options.where, item: req.query.item };
			}

			const query = await tables.StockLogTable.findAll(options);
			res.status(200).send(query);
		} else {
			return res
				.status(400)
				.send({ status: "failed", errorc: 1, error: "Bad query for 'type'" });
		}
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
