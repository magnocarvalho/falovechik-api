import { UsuarioModel, IUsuarioModel } from "../model/definitions/Usuario";

const fs = require("fs");
class UsuarioCtrl {
  static create(req, res, next) {
    var obj = req.body;
    UsuarioCtrl.getByCpf(obj.cpf).then(res => {
      next({ error: 'usuario ja existe!' })
    }, err => {
      UsuarioCtrl.getByUserNAme(obj.username).then(res1 => {
        next({error: 'username ja exite'});
      },
        err => {
          UsuarioModel.create(obj, (err, data) => {
            if (err) next(err);
            else res.json(data);
          });
        })

    })



  }
  static loginFirebase(req, res, next) {
    var obj = req.body;
    var uid = obj.email;
    console.log(obj);
    UsuarioCtrl.getByLoginFirebase(uid).then(data => {
      if (data) {
        res.json(data);
      }
    },
      err => {
        next(err);
      });

  }

  static login(req, res, next) {
    var obj = req.body;
    var email = obj.email;
    var pass = obj.pass;
    UsuarioCtrl.getByLogin(email, pass).then(data => {
      if (data) {
        res.json(data);
      }
    },
      err => {
        next(err);
      });

  }
  static putDadosUsuario(req, res, next) {
    var obj = req.body;
    var id = obj.id;
    if (obj.logo) {
      var base64Data = obj.logo.replace(/^data:image\/[a-z]+;base64,/, "");
      obj.logo = id + ".png";
      fs.writeFile(
        "./bin/assets/" + id + ".png",
        base64Data,
        "base64",
        function (err) {
          if (err) console.log("err = " + err);
        }
      );
    }
    UsuarioModel.findOneAndUpdate({ id: id }, obj, (err, data) => {
      if (err) next(err);
      else {
        res.json(data);
      }
    });
  }

  static getDadosUsuario(req, res, next) {
    var obj = req.params.id;
    UsuarioCtrl.getById(obj).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  static getUsuarios(req, res, next) {
    UsuarioCtrl.getAll().then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  private static getAll() {
    var listadeusuario = [];
    return new Promise<any[]>((resolve, reject) => {
      UsuarioModel.find({ isDeleted: false }, { username: 1 }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          for (let i = 0; i < data.length; i++) {
            listadeusuario.push({ text: data[i].username, id: data[i]._id });
          }
          resolve(listadeusuario);
        }
      });
    });
  }
  private static getById(id) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, id: id }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByCpf(cpf) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, cpf: cpf }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByUserNAme(user) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, username: user }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByLogin(email, pass) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, email: email, pass: pass }, { pass: 0 }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByLoginFirebase(uid) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, email: uid }, { pass: 0 }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}
export default UsuarioCtrl;
