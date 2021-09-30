const Article = require(`./article`);
const Comment = require(`./comment`);
const Income = require(`./income`);
const User = require(`./user`);

// j`ai 1 user qui a N income

    User.hasMany(Income, {
        foreignKey: "user_id",
        as: "income",
    });

    Income.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });

//  Ecrire, 0N USER, 11 ARTICLE
    // 0N USER - reciproque
    User.hasMany(Article, { 
        foreignKey: "user_id",
        as: "article",
    });

    // 11 ARTICLE
    Article.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });

// Commenter, 0N USER, 1N COMMENT    
    // 0N USER - reciproque
    User.hasMany(Comment, {
        foreignKey: "user_id",
        as: "comment",
    });

    // 1N COMMENT
    Comment.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });
    
// Contenir, 11 COMMENT, 0N ARTICLE
    // 0N ARTICLE
    Article.hasMany(Comment, {
        foreignKey: "article_id",
        as: "comment",
    });

    // 11 COMMENT,
    Comment.belongsTo(Article, {  
        foreignKey: "article_id",
        as: "article",
    });

/ RELATION Table/
    // relation entre deux table
    // appartient, 0N article, 0N comment
    Article.belongsToMany(Comment, {
        as: `comments`,
        through: `article_comment`, // nom de la table de liaison
        foreignKey: `article_id`, // nom de la clef etrangère correspondant à cette classe (donc article)
        otherKey: `comment_id` // nom de l`autre clef etrangère
    });
    
    
    // réciproque
    Comment.belongsToMany(Article, {
        as: `comments`,
        through: `article_comment`, // nom de la table de liaison
        foreignKey: `comment_id`, // nom de la clef etrangère correspondant à cette classe (donc comment)
        otherKey: `article_id` // nom de l`autre clef etrangère
    });

module.exports = {Article, Comment, Income, User};