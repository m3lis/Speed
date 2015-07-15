/*
 * @version   : 3.2.0 - Ext.NET License
 * @author    : Object.NET, Inc. http://object.net/
 * @date      : 2015-07-15
 * @copyright : Copyright (c) 2008-2015, Object.NET, Inc. (http://object.net/). All rights reserved.
 * @license   : See license.txt and http://ext.net/license/
 */


Ext.ns('Ext.ux');Ext.define('Ext.ux.TabScrollerMenu',{alias:'plugin.tabscrollermenu',requires:['Ext.menu.Menu'],pageSize:10,maxText:15,menuPrefixText:'Items',constructor:function(config){Ext.apply(this,config);},init:function(tabPanel){var me=this;me.tabPanel=tabPanel;if(!me.tabPanel.tabBar){me.tabPanel.tabBar=me.tabPanel;}
tabPanel.on({render:function(){me.tabBar=me.tabPanel.tabBar;me.layout=me.tabBar.layout;me.layout.overflowHandler.handleOverflow=Ext.Function.bind(me.showButton,me);me.layout.overflowHandler.clearOverflow=Ext.Function.createSequence(me.layout.overflowHandler.clearOverflow,me.hideButton,me);},destroy:me.destroy,scope:me,single:true});},showButton:function(){var me=this,result=Ext.getClass(me.layout.overflowHandler).prototype.handleOverflow.apply(me.layout.overflowHandler,arguments),button=me.menuButton,scroller;if(me.tabPanel.items.getCount()>1){if(!button){button=me.menuButton=me.tabBar.body.createChild({cls:Ext.baseCSSPrefix+'tab-tabmenu-right'});scroller=me.tabBar.body.child('.'+Ext.baseCSSPrefix+'box-scroller-right');scroller.addCls(Ext.baseCSSPrefix+"tab-tabmenu-scroller-right");button.addClsOnOver(Ext.baseCSSPrefix+'tab-tabmenu-over');button.on('click',me.showTabsMenu,me);}
button.setVisibilityMode(Ext.dom.Element.DISPLAY);button.show();result.reservedSpace+=button.getWidth();}else{me.hideButton();}
return result;},hideButton:function(){var me=this;if(me.menuButton){me.menuButton.hide();}},getPageSize:function(){return this.pageSize;},setPageSize:function(pageSize){this.pageSize=pageSize;},getMaxText:function(){return this.maxText;},setMaxText:function(t){this.maxText=t;},getMenuPrefixText:function(){return this.menuPrefixText;},setMenuPrefixText:function(t){this.menuPrefixText=t;},showTabsMenu:function(e){var me=this;if(me.tabsMenu){me.tabsMenu.removeAll();}else{me.tabsMenu=new Ext.menu.Menu();}
me.generateTabMenuItems();var target=Ext.get(e.getTarget()),xy=target.getXY();xy[1]+=24;me.tabsMenu.showAt(xy);},generateTabMenuItems:function(){var me=this,tabPanel=me.tabPanel,curActive=tabPanel.getActiveTab(),allItems=tabPanel.items.getRange(),pageSize=me.getPageSize(),tabsMenu=me.tabsMenu,totalItems,numSubMenus,remainder,i,curPage,menuItems,x,item,start,index;tabsMenu.suspendLayouts();allItems=Ext.Array.filter(allItems,function(item){if(item.id==curActive.id){return false;}
return item.hidden?!!item.hiddenByLayout:true;});totalItems=allItems.length;numSubMenus=Math.floor(totalItems/pageSize);remainder=totalItems%pageSize;if(totalItems>pageSize){for(i=0;i<numSubMenus;i++){curPage=(i+1)*pageSize;menuItems=[];for(x=0;x<pageSize;x++){index=x+curPage-pageSize;item=allItems[index];menuItems.push(me.autoGenMenuItem(item));}
tabsMenu.add({text:me.getMenuPrefixText()+' '+(curPage-pageSize+1)+' - '+curPage,menu:menuItems});}
if(remainder>0){start=numSubMenus*pageSize;menuItems=[];for(i=start;i<totalItems;i++){item=allItems[i];menuItems.push(me.autoGenMenuItem(item));}
me.tabsMenu.add({text:me.menuPrefixText+' '+(start+1)+' - '+(start+menuItems.length),menu:menuItems});}}else{for(i=0;i<totalItems;++i){tabsMenu.add(me.autoGenMenuItem(allItems[i]));}}
tabsMenu.resumeLayouts(true);},autoGenMenuItem:function(item){var maxText=this.getMaxText(),text=Ext.util.Format.ellipsis(item.title||item.text,maxText);return{text:text,handler:this.showTabFromMenu,scope:this,disabled:item.disabled,tabToShow:item,iconCls:item.iconCls};},showTabFromMenu:function(menuItem){this.tabPanel.setActiveTab(menuItem.tabToShow);},destroy:function(){Ext.destroy(this.tabsMenu,this.menuButton);}});
