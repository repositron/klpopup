/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typescript/JmDict/Parser.ts"/>
/// <reference path="../../typings/chrome/chrome.d.ts"/>

'use strict';
console.log("XmlParser.spec.ts");
describe("xml entry", function()  {
    it("has a main entry word", () =>  {
        var parser = new JmDict.Parser();
        var html = parser.XmlToEntry(Testdata.entryXml);
        var dom = Utility.HtmlToDom(html);
        //console.debug(dom);
        var keb = dom.firstChild.nodeValue;
        /*
        var elements : NodeListOf<HTMLDivElement> = dom.getElementsByTagName('div');
        var element = elements[0];
*/
        expect(keb).toEqual('説明');
        //expect(parser.XmlToEntry(Testdata.entryXml));
    })


});

class Utility {
    public static HtmlToDom(htmlStr : string) : Node {
        var div = document.createElement('div');
        div.innerHTML = htmlStr;
        var elements = div.firstChild;
        return elements;
    }

    public static HTMLParser(aHTMLString : string) : Document {
        var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
        var body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
        html.documentElement.appendChild(body);
        return html;
    }
}

class Testdata {
    public static entryXml : string =
        ['<entry>',
            '<ent_seq>1386460</ent_seq>',
            '<k_ele>',
            '<keb>説明</keb>',
            '<ke_pri>ichi1</ke_pri>',
            '<ke_pri>news1</ke_pri>',
            '<ke_pri>nf02</ke_pri>',
            '</k_ele>',
            '<r_ele>',
            '<reb>せつめい</reb>',
            '<re_pri>ichi1</re_pri>',
            '<re_pri>news1</re_pri>',
            '<re_pri>nf02</re_pri>',
            '</r_ele>',
            '<sense>',
            '<pos>&n;</pos>',
            '<pos>&vs;</pos>',
            '<pos>&adj-no;</pos>',
            '<gloss>explanation</gloss>',
            '<gloss>exposition</gloss>',
            '<gloss xml:lang=\"dut\">uitleg</gloss>',
            '<gloss xml:lang=\"dut\">uitlegging</gloss>',
            '<gloss xml:lang=\"dut\">opheldering</gloss>',
            '<gloss xml:lang=\"dut\">uiteenzetting</gloss>',
            '<gloss xml:lang=\"dut\">aanwijzing</gloss>',
            '<gloss xml:lang=\"dut\">explicatie</gloss>',
            '<gloss xml:lang=\"dut\">verheldering</gloss>',
            '<gloss xml:lang=\"dut\">expositie</gloss>',
            '<gloss xml:lang=\"dut\">exposé</gloss>',
            '<gloss xml:lang=\"dut\">illustratie</gloss>',
            '<gloss xml:lang=\"dut\">toelichting</gloss>',
            '<gloss xml:lang=\"dut\">verklaring</gloss>',
            '<gloss xml:lang=\"dut\">elucidatie</gloss>',
            '<gloss xml:lang=\"dut\">adstructie</gloss>',
            '<gloss xml:lang=\"dut\">{m.b.t. foto, illustratie e.d.} onderschrift</gloss>',
            '<gloss xml:lang=\"dut\">{m.b.t. foto, illustratie e.d.} bijschrift</gloss>',
            '<gloss xml:lang=\"dut\">uitleggen</gloss>',
            '<gloss xml:lang=\"dut\">verklaren</gloss>',
            '<gloss xml:lang=\"dut\">ophelderen</gloss>',
            '<gloss xml:lang=\"dut\">expliceren</gloss>',
            '<gloss xml:lang=\"dut\">expliqueren</gloss>',
            '<gloss xml:lang=\"dut\">(uit)duiden</gloss>',
            '<gloss xml:lang=\"dut\">verduidelijken</gloss>',
            '<gloss xml:lang=\"dut\">vertolken</gloss>',
            '<gloss xml:lang=\"dut\">toelichten</gloss>',
            '<gloss xml:lang=\"dut\">illustreren</gloss>',
            '<gloss xml:lang=\"dut\">uiteenzetten</gloss>',
            '<gloss xml:lang=\"dut\">verhelderen</gloss>',
            '<gloss xml:lang=\"dut\">exposé geven</gloss>',
            '<gloss xml:lang=\"dut\">exponeren</gloss>',
            '<gloss xml:lang=\"dut\">elucideren</gloss>',
            '<gloss xml:lang=\"dut\">adstrueren</gloss>',
            '<gloss xml:lang=\"fre\">éclaircissements</gloss>',
            '<gloss xml:lang=\"fre\">explication</gloss>',
            '<gloss xml:lang=\"fre\">présentation</gloss>',
            '<gloss xml:lang=\"ger\">(f) Erklärung</gloss>',
            '<gloss xml:lang=\"ger\">(f) Erläuterung</gloss>',
            '<gloss xml:lang=\"ger\">(f) Darlegung</gloss>',
            '<gloss xml:lang=\"ger\">erklären</gloss>',
            '<gloss xml:lang=\"ger\">erläutern</gloss>',
            '<gloss xml:lang=\"ger\">darlegen</gloss>',
            '<gloss xml:lang=\"ger\">explikativ</gloss>',
            '<gloss xml:lang=\"hun\">magyarázat</gloss>',
            '<gloss xml:lang=\"hun\">megfejtés</gloss>',
            '<gloss xml:lang=\"hun\">ismertetés</gloss>',
            '<gloss xml:lang=\"hun\">kifejtés</gloss>',
            '<gloss xml:lang=\"slv\">razlaga</gloss>',
            '<gloss xml:lang=\"slv\">tolmačenje</gloss>',
            '<gloss xml:lang=\"slv\">navodilo</gloss>',
            '<gloss xml:lang=\"slv\">razložiti</gloss>',
            '<gloss xml:lang=\"slv\">razlagati</gloss>',
            '<gloss xml:lang=\"slv\">pojasniti</gloss>',
            '<gloss xml:lang=\"spa\">explicación</gloss>',
            '<gloss xml:lang=\"spa\">exposición</gloss>',
            '<gloss xml:lang=\"spa\">explicar</gloss>',
            '<gloss xml:lang=\"spa\">explicar</gloss>',
            '<gloss xml:lang=\"spa\">aclarar</gloss>',
            '<gloss xml:lang=\"spa\">comentar</gloss>',
            '<gloss xml:lang=\"swe\">förklaring</gloss>',
            '</sense>',
            '</entry>',
            '<entry>'].join('\n');
};