/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {

    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcryptjs');

    return sequelize.define('User', {
        idUser: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        tableName: 'User',
        freezeTableName: true,
        timestamps : false,
        instanceMethods: {

            setPassword : function(password){
                this.salt = crypto.randomBytes(16).toString('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
            },

            validPassword: function(password) {
                var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
                return this.hash === hash;
            },

            generateJwt : function(){

                var today = new Date()
                var exp = new Date();
                exp.setHours(today.getHours()+24);//expiry in 24 hours

                return jwt.sign({
                    _id:this.idUser,
                    username :this.username,
                    exp :parseInt(exp.getTime()/1000)
                },'secret_User')
            }
        }





    });


};
