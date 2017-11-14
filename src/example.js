const fsc = require("fs-cheerio");
const path = require('path');
const fs = require('fs');

class IconHtmlFetcher{
    constructor(optionObj){
        for(var key in optionObj){
            if(optionObj.hasOwnProperty(key)){
                this[key] = optionObj[key];
            }
        }
        this.iconObjAry = [];
    };
    fetch() {
        const that = this;
        fsc.readFile(this.path).then(function($){
            $(that.selectorStr).each((index, item)=>{
                const identify = item.attribs.class.replace(that.classPrefix, '');
                let html = that.template.replace(/\{\{tagName\}\}/g, that.tagName);
                html = html.replace(/\{\{identify\}\}/g, identify);
                const iconObj = {
                    identify,
                    html,
                };
                that.iconObjAry.push(iconObj);
            });
        }).then(function(){
            console.log('if you can see this line, the then block function which contain writeFile code was executed!');
            const str = JSON.stringify(that.iconObjAry);
            const toPath = path.resolve(__dirname, that.label + 'ListObj.js'); 
            fs.writeFile(toPath, str);
        });       
    };
    init(){
        this.fetch();
        const that = this;
        // setTimeout(()=> console.log(that.htmlAry), 3000);
    }
}

const fontawesomeIconFetcher = new IconHtmlFetcher(
    {
        label: 'fontawesome',
        path: path.resolve('../srcHtml', 'fontawesome.list', 'index.html'),
        selectorStr: '.fa-hover a i.fa',
        classPrefix: 'fa fa-',
        tagName: 'span',
        template: '<{{tagName}} class="fa fa-{{identify}}" aria-hidden="true"></{{tagName}}>',
    }
);
const glyphiconsIconFetcher = new IconHtmlFetcher(
    {
        label: 'glyphicons',
        path: path.resolve('../srcHtml', 'glyphicons.list', 'index.html'),
        selectorStr: '.bs-glyphicons-list li span.glyphicon',
        classPrefix: 'glyphicon glyphicon-',
        tagName: 'i',
        template: '<{{tagName}} class="glyphicon glyphicon-{{identify}}" aria-hidden="true"></{{tagName}}>',
    }
);
glyphiconsIconFetcher.init();
fontawesomeIconFetcher.init();