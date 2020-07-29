import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import  {message}  from 'ant-design-vue';
import {Modal}   from 'ant-design-vue';
import {Menu}   from 'ant-design-vue';
import {Checkbox}   from 'ant-design-vue';
import {Icon}   from 'ant-design-vue';
import {Badge}   from 'ant-design-vue';
import {Steps}   from 'ant-design-vue';
import {Upload}   from 'ant-design-vue';


import  {notification}  from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

Vue.use(Modal);
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(Steps);
Vue.use(Upload);



