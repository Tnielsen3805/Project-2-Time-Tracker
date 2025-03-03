import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
class TimeEntry extends Model {
    id;
    user_id;
    start_time;
    end_time;
    task_description;
    created_at;
    updated_at;
 
    get duration() {
        if (this.start_time && this.end_time) {
            return (new Date(this.end_time).getTime() - new Date(this.start_time).getTime()) / 1000;
        }
        return null;
    }
}
TimeEntry.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", 
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    task_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: "time_entries",
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
});
export default TimeEntry;
