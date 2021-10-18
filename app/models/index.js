const Article = require(`./article`);
const Comment = require(`./comment`);
const Infosimulation = require(`./infosimulation`);
const User = require(`./user`);
const Guestbook = require(`./guestbook`);
const Nbsimulation = require(`./nbsimulation`);

// j`ai 1 user qui a N Infosimulation
    User.hasMany(Infosimulation, {
        foreignKey: "user_id",
        as: "infosimulation",
    });

    Infosimulation.belongsTo(User, {
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

 //  Ecrire, 0N USER, 11 GUESTBOOK
    User.hasMany(Guestbook, {
        foreignKey: "user_id",
        as: "guestbook",
    });

    Guestbook.belongsTo(User, {
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
    
  //! Pour la V2
  
  // Livre d'or, 11 COMMENT, 0N GUESTBOOK
    // 0N GUESTBOOK
    Guestbook.hasMany(Comment, {
        foreignKey: "guestbook_id",
        as: "comment",
    });

      // 11 COMMENT,
    Comment.belongsTo(Guestbook, {  
        foreignKey: "guestbook_id",
        as: "guestbook",
    });
    

      // Simulation, 0N USER, 1N simulation    
    // 0N USER - reciproque
    User.hasMany(Nbsimulation, {
        foreignKey: "user_id",
        as: "nbsimulation",
    });

    // 1N COMMENT
    Nbsimulation.belongsTo(User, {
        foreignKey: "user_id",
        as: "user",
    });





  //! RELATION Table
    // relation entre deux table

    //! Relation article et comment
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



    //! Relation livre d'or et comment Pour la V2
    // appartient, 0N livre d'or, 0N comment
  //  Guestbook.belongsToMany(Comment, {
  //      as: `comments`,
  //      through: `guestbook_comment`, // nom de la table de liaison
  //      foreignKey: `guestbook_id`, // nom de la clef etrangère correspondant à cette classe (donc guesbook)
  //      otherKey: `comment_id` // nom de l`autre clef etrangère
  //  });
    
      // réciproque
  //  Comment.belongsToMany(Guestbook, {
  //      as: `comments`,
  //      through: `guestbook_comment`, // nom de la table de liaison
  //      foreignKey: `comment_id`, // nom de la clef etrangère correspondant à cette classe (donc comment)
  //      otherKey: `guestbook_id` // nom de l`autre clef etrangère
  //  });

 //! union des deux reciprociter avec comment
 //   Comment.belongsToMany(Article, Guestbook, {
 //       as: `comments`,
 //       through: `article_comment` + `guestbook_comment` ,// nom de la table de liaison
 //       foreignKey: `comment_id`, // nom de la clef etrangère correspondant à cette classe (donc comment)
 //       otherKey: `article_id`+`guestbook_id`, // nom de l`autre clef etrangère
 //   });

module.exports = {Article, Comment, Infosimulation, User, Guestbook, Nbsimulation};