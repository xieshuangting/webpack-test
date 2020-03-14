import axios from 'axios'
import $ from 'jquery'
// 同步引进代码
// console.log(_.join(['a','d','c'],'***'));

// 异步引进代码
// function getComponent(){
//     return import( /* webpackChunkName:'lodash' */ 'lodash').then(({default:_})=>{
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['xie','ting'],'-');
//         return element;
//     })
// }

// async function getComponent() {
//     const {
//         default: _
//     } = await import( /* webpackChunkName:'lodash' */ 'lodash');
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['xie', 'ting'], '-');
//     return element;
// }
// document.addEventListener('click', () => {
//     getComponent().then(element => {
//         document.body.appendChild(element);
//     })
// })

// document.addEventListener('click', () => {
//     import(/* webpackPrefetch:true */'./click.js').then((func) => {
//         func();
//     })
// })

// import './style.css'
// import './style1.css'

// const dom = $('<div>');
// dom.html(_join(['xie','ting']),'==');
// $('body').append(dom)

// console.log(this)
// console.log(this== window)

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//             .then(registration => {
//                 console.log('service-worker registed')
//             }).catch(error => {
//                 console.log('service-worker register error')
//             })
//     })
// }
console.log(241)
document.getElementById('pid').onclick(function(){
    console.log(33333)
})
// $('pid').click(function(){
    
//     // axios.get('/react/api/header.json').then((res)=>{
//     //     console.log(res)
//     // })
// })
