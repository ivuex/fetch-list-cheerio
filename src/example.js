const fsc = require("fs-cheerio");
// const fs = require('fs');
const path = require('path');

class IconHtmlFetcher{
    constructor(optionObj){
        for(var key in optionObj){
            if(optionObj.hasOwnProperty(key)){
                this[key] = optionObj[key];
            }
        }
        this.htmlAry = [];
        // console.log(this);
    };
    updateIconAry() {
        const that = this;
        fsc.readFile(this.path).then(function($){
            $(that.selectorStr).each((index, item)=>{
                const identify = item.attribs.class.replace(that.classPrefix, '');
                let html = that.template.replace(/\{\{tagName\}\}/g, that.tagName);
                html = html.replace(/\{\{identify\}\}/g, identify);
                that.htmlAry.push(html);
            });
        });       
    };
    init(){
        this.updateIconAry();
        const that = this;
        setTimeout(()=> console.log(that.htmlAry), 3000);
    }
}

const fontawesomeIconFetcher = new IconHtmlFetcher(
    {
        path: path.resolve('../srcHtml', 'fontawesome.list', 'index.html'),
        selectorStr: '.fa-hover a i.fa',
        classPrefix: 'fa fa-',
        tagName: 'span',
        template: '<{{tagName}} class="fa fa-{{identify}}" aria-hidden="true"></{{tagName}}>',
    }
);
const glyphiconsIconFetcher = new IconHtmlFetcher(
    {
        path: path.resolve('../srcHtml', 'glyphicons.list', 'index.html'),
        selectorStr: '.bs-glyphicons-list li span.glyphicon',
        classPrefix: 'glyphicon glyphicon-',
        tagName: 'i',
        template: '<{{tagName}} class="glyphicon glyphicon-{{identify}}" aria-hidden="true"></{{tagName}}>',
    }
);
glyphiconsIconFetcher.init();
// fontawesomeIconFetcher.init();