/*
*  param = {
        umeng_type:"",              // 必须，（友盟）事件类型
        umeng_remark:"",            // 可选，（友盟）事件说明，默认为umeng_type的值
        umeng_channelParam:"",      // 可选，推广渠道参数名称，默认为"source"
        talking_id:"",              // 必须，（talkingData）自定义事件ID
        talking_label:"",           // 可选，（talkingData）一个事件的子分类，默认为umeng_type的值
        talking_mapK:{}             // 可选，（talkingData）事件的参数信息，描绘发生事件时的属性和场景。
    }
* */

function sendStatistics(param) {
  var umeng_type = param.umeng_type || "";
  var umeng_remark = param.umeng_remark || umeng_type;
  var umeng_channelParam = param.umeng_channelParam || "source";
  var talking_id = param.talking_id.replace(/\-/g, "_") || "";
  var talking_label = param.talking_label || umeng_remark;
  var talking_mapKv = param.talking_mapKv || undefined;
  // 友盟统计
  _czc.push(['_trackEvent', umeng_type, umeng_remark]);
  console.log("友盟统计："+ "_czc.push(['_trackEvent', "+umeng_type+", "+umeng_remark+"])");
}