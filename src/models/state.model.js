module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define('state', {
        date:{ type:Sequelize.DATE, allowNull:false },
        state: { type: Sequelize.STRING, allowNull:false },
        fips: { type: Sequelize.SMALLINT, allowNull:false },
        cases: { type: Sequelize.INTEGER, allowNull:false },
        deaths: { type: Sequelize.INTEGER, allowNull:false }
    });
    return State;
};
