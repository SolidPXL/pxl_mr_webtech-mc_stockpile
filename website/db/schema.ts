import { Sequelize, DataTypes } from 'sequelize';


// export const sequelize = new Sequelize(`postgres://postgres:bmXEvdrbP3aRo!l37AY3@167.235.195.70:5432/devdb`)
export const sequelize = new Sequelize(`postgres://postgres:${process.env.POSTGRES_PASSW}@${process.env.POSTGRES_HOST}:5432/devdb`)



const ItemStockTable = sequelize.define('item_stock',{
    id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    item: {
        type: DataTypes.STRING,
        allowNull:false
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{
    timestamps:false
})

const StockLogTable = sequelize.define('stock_logs',{
    item: {
        type: DataTypes.STRING,
        allowNull:false
    },
    method:{
        type: DataTypes.STRING,
        validate: {
            isIn:[['ADD','REMOVE','ERR']]
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull:true
    },
    extra: {
        type:DataTypes.STRING,
        allowNull:true,
    }
})




const tables = {
    ItemStockTable,
    StockLogTable
}

export default tables