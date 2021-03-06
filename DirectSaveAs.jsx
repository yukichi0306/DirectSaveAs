/*
==============================================================================================

# DirectSaveAs
Update:2020/06/09
条件分岐として、レイヤーの表示状態を追加

https://github.com/yukichi0306/
++Introduction++
レイヤー名を、++[上書きしたいファイルの絶対パス]にし、表示状態で実行すると、
pngかtgaで上書きするスクリプト

==============================================================================================
*/
var docObj = activeDocument;
var pathEgg = [];   //保存先候補
var layName = [];   //レイヤー名
var visiNum = 0;

//レイヤー名を配列に
for (i = 0; i < docObj.artLayers.length; i++)
{
    if(docObj.artLayers[i].visible)
        {
    layName[visiNum] = docObj.artLayers[i].name;
            visiNum++;
            }
}

//レイヤーセット内のレイヤー名を配列に
for(i = 0; i < docObj.layerSets.length; i++)
{
        for (j = 0; j < docObj.layerSets[i].artLayers.length; j++)
        {
            var n = docObj.layerSets[i].artLayers[j].name;
            layName.push(n);
        }
}

//保存先候補となるレイヤー名の検索
for (i = 0,j = 0; i < layName.length; i++)
{
if(layName[i].indexOf('++') !== -1)
    {
        pathEgg[j] = layName[i];
        j++;
    }
}

//保存実行分岐
if(pathEgg.length == 0)
{
    alert("保存先を示したレイヤーが見つかりません。");
    }
else if(pathEgg.length == 1)
{
    DirectSave ();
    }
else if(pathEgg.length > 1)
{
    alert("保存先を示したレイヤーが２つ以上あります。");
    }

function DirectSave()
{
    var formatJudge  = pathEgg[0].slice(-4);
    var PngJudge = formatJudge.indexOf('.png');
    var TgaJudge = formatJudge.indexOf('.tga');
    if(PngJudge == 0 && TgaJudge == -1)
    {
        DirectPngSave ();
        }
    else if(PngJudge == -1 && TgaJudge == 0)
    {
        DirectTgaSave ();
        }
    else
    {
        DirectPngSave ();
        alert ("とりあえず、Pngで保存しました。")
        }
}

//Png画像を保存する===================================================================
function DirectPngSave()
{
var filePath = pathEgg[0].replace('++', '');
var num = filePath.lastIndexOf ('\\');
var folderPath = filePath.slice(0,num+1);
var folderJudge = new Folder(folderPath);
var flag = folderJudge.exists;
//PngSave=======================================================
if(flag == true)
{
pngFile = new File(filePath);//パス指定とファイル名
pngOpt = new PNGSaveOptions();
pngOpt.interlaced = false;
activeDocument.saveAs(pngFile, pngOpt, true, Extension.LOWERCASE);
alert('Finish');
}
else if(flag == false)
{
    alert("保存先に指定されたフォルダが存在しません。");
    }
}
//===============================================================================

//Tga画像を保存する====================================================================
function DirectTgaSave()
{
var filePath = pathEgg[0].replace('++', '');
var num = filePath.lastIndexOf ('\\');
var folderPath = filePath.slice(0,num+1);
var folderJudge = new Folder(folderPath);
var flag = folderJudge.exists;
//TgaSave=======================================================
if(flag == true)
{
targaFile = new File(filePath);//パス指定とファイル名
tgaOpt = new TargaSaveOptions();
tgaOpt.alphaChannels = true;
tgaOpt.resolution = TargaBitsPerPixels.THIRTYTWO;
tgaOpt.rleCompression = false;
activeDocument.saveAs(targaFile, tgaOpt, true, Extension.LOWERCASE);
alert('Finish');
}
else if(flag == false)
{
    alert("保存先に指定されたフォルダが存在しません。");
    }
}
//===============================================================================