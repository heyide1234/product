let newclassDate1 = "";

export function getJL(v) {
   newclassDate1 = "[";
   let classcode = [];//一级分类编号
   v.forEach(item => {
      if (classcode.length == 0 || classcode.indexOf(item.Class1Num) == -1) {
         classcode.push(item.Class1Num);
         newclassDate1 += ",{\"value\":\"" + item.Class1Num + "\",\"label\":\"" + item.Class1Num + "-" + item.Class1Name + "\",\"children\":[";
         querylist(v, item.Class1Num);
         newclassDate1 += "]}";
      }
   });
   newclassDate1 += "]";
   let codes = newclassDate1;
   codes = codes.replace(/\[,{/g, "[{");
   let des = JSON.parse(codes);
   return des;
}
function querylist(t, v) {
   let classcode2 = [];//二级分类编号
   t.forEach(item => {
      if (item.Class1Num === v) {
         if (classcode2.indexOf(item.Class2Num) === -1) {
            classcode2.push(item.Class2Num)
            newclassDate1 += ",{\"value\":\"" + item.Class2Num + "\",\"label\":\"" + item.Class2Num + "-" + item.Class2Name + "\",\"children\":[";
            querylist1(t, v, item.Class2Num);
            newclassDate1 += "]}";
         }
      }
   });
}
function querylist1(t1, v1, v2) {
   let classcode3 = [];//二级分类编号
   t1.forEach(item => {
      if (item.Class1Num === v1 && item.Class2Num === v2) {
         if (classcode3.indexOf(item.Class3Num) === -1)
            classcode3.push(item.Class3Num)
         newclassDate1 += ",{\"value\":\"" + item.Class3Num + "\",\"label\":\"" + item.Class3Num + "-" + item.Class3Name + "\"}";
      }
   });
}

