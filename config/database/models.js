'use strict'
const mongoose = require('./connection'),
  schemas = require('./schemas');

const models = {
    //Usuarios
    User: mongoose.model('user', schemas.userSchema, 'users'),
    //Roles
    Role: mongoose.model('role', schemas.roleSchema, 'roles'),
    //Membresías
    Membership: mongoose.model('membership', schemas.membershipSchema, 'memberships'),
    //Log o bitácora
    Log: mongoose.model('log', schemas.logSchema, 'logs'),
    //Paises
    Country: mongoose.model('country', schemas.countrySchema, 'countries'),
    //Provincias
    // Province: mongoose.model('province', schemas.provinceSchema, 'provinces'),
    //Ciudades
    City: mongoose.model('city', schemas.citySchema, 'cities'),
    //Módulos
    Module: mongoose.model('module', schemas.moduleSchema, 'modules'),
    //Submódulos
    Submodule: mongoose.model('submodule', schemas.submoduleSchema, 'submodules'),
    //Rangos
    Rangesubmodule: mongoose.model('range_submodule', schemas.rangeSubmoduleSchema, 'range_submodules'),
    //Permisos de usuarios
    PermissionUser: mongoose.model('permission_user', schemas.permissionUserSchema, 'permission_users'),
    //Permisos de roles
    PermissionRole: mongoose.model('permission_role', schemas.permissionRoleSchema, 'permission_roles'),
    //Permisos de membresías
    PermissionMembership: mongoose.model('permission_membership', schemas.permissionMembershipSchema, 'permission_membership'),
    //Membresías de los usuarios
    MembershipUser: mongoose.model('membership_user', schemas.membershipUserSchema, 'membership_users'),
    //Redes sociales del sistema
    Social: mongoose.model('social', schemas.socialSchema, 'socials'),
    //Redes sociales del usuario
    SocialUser: mongoose.model('social_user', schemas.socialUserSchema, 'users_social'),
    //Consultas realizadas por los usuarios
    SearchUserSocial: mongoose.model('search_user_social', schemas.socialSearchUserSchema, 'searches_users_social')
};

module.exports = models;