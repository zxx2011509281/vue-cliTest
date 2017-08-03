import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import aaa from '@/components/aaa'
import Main from '../main.vue';
//加班统计
import Organization from '../components/oa1/orgManagement/organization.vue';
import LineChart from '../components/oa1/attendanceManagement/lineChart.vue';
import UserManagement from '../components/oa1/userManagerment/userManagement.vue';
import AttendanceManagement from '../components/oa1/attendanceManagement/attendanceManagement.vue';
import MenuManagement from '../components/oa1/menuManagement/menuManagement.vue';
import HolidayManagement from '../components/oa1/holidayManagement/holidayManagement.vue';
import RecordDetail from '../components/oa1/attendanceManagement/recordDetail.vue';
Vue.use(Router)

export default new Router({
  routes: [
  	{name:'app', path:'*', redirect: '/bbb'},
    {
      path: '/bbb',
      name: 'Hello',
      component: Hello
    },
    {
    	path:'/aaa',
    	name:'aaa',
    	component:aaa
    },
      //加班统计
  {name:'组织机构管理',path:'/oa/org/manager',component:Organization},
  {name:'加班详情',path:'/oa/lineChart',component:LineChart},
  {name:'用户管理',path:'/oa/user/manager',component:UserManagement},
  {name:'考勤统计',path:'/oa/kaoqin/manger',component:AttendanceManagement},
  {name:'菜单管理',path:'/oa/menu/manager',component:MenuManagement},
  {name:'节假日管理',path:'/oa/kaoqin/calendar',component:HolidayManagement},
  {name:'打卡详细',path:'/oa/overtimeDetail',component:RecordDetail},
  ]
})
