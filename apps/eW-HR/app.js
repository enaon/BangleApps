// place your const, vars, functions or classes here

// init UI
eval(require('Storage').read('eW-UI.js'));
ew.sys.TC.init();
ew.face.app="eW-HR";

// icons
ew.UI.icon = {
    scan: "mEwwhC/AH4ABmczmAVSgczkUikcjCyMyCwIACmQWRIwIABAoIYOIgIWDDAcgFxoWFAAJKBFxkjC44wNFxAvCMJUDLowXEJBUDIxQABJBJGJC970EXqIXvLwYXrCwjYJC75GFX5UjFxYXJgYXFFwoXLkQWKLxJgFCw4XLmZIBCxBGJYIYVHF5owBC5QwUmUSGBsjDAsykERGBsAVQQCBCwMAgIYCC5cAgRyGiJJBGBgAHGAIxBC6YwBGIIwwC6gwCC6gwBiAXVAH4A8A=",
    settings: "mEwwI2zgP/Ao0f////P/nE/AoP9/88ApU4EZYADAooAICg2AApE8/+/G4P4Aon8AoscCIgjLACkf8AFE+CJDz/3/B9CAoP8ApRBBDogFJF4gAsA=",
	clock:"mEwwIdah/wAof//4ECgYFB4AFBg4FB8AFBj/wh/4AoM/wEB/gFBvwCEBAU/AQIUCj8AgPwgOAh+AgfggfAg/AAYIBDA4ngg4TB4EBApkPKgJSBJQIFNNYIFEwAFIgJ9CAoIADGoIFNv5ZCToRpCAoiYCv/gPoItCBIKJDAoKVDAoKeCC4KtD/oFBXIX5AoLFDGYLRFborpGACoA=",
    launcher: "mUywIxuh/AAon8Aocf//gAon+Aon/+AFBn4FB/4FFBgIRCDIUHAoX/wEAAoY5Bh4FEgF/AogZCC4IMDAocDGwQEB4E/gFwAoJbCBoMBEQReCv/+BAP4G4Xz/4VDAAIFCG4R9DG4IXBBgYFDOIJ7CgE8gfwg4KCMwR8CEQMPPgfgQoJ8DSIJ8gHIT/jABQA=="
};

// out
ew.face.out=function(){
    require("Storage").write("eW-HR.json", ew.apps.hr.state.def); 
    ew.face[0].clear();
    ew.face[1].clear();
};

// data 
ew.apps.hr = { state: { def: {} } };
ew.apps.hr.state.def = Object.assign({
            page: 0,
            topL: 100,
            btmL: 75 
        }, require("Storage").readJSON("eW-HR.json", true) || { });


// button
Bangle.setUI({ mode: "custom", "btn": function () {
    ew.face.out();
    Bangle.load(); 
    } });

// clear screen
ew.UI.ele.fill("_main", 15, 0);

// HR page
ew.face[0] = {
    data: {
        topL: ew.apps.hr.state.def.topL,
        btmL: ew.apps.hr.state.def.btmL,
        source: [], // health data array
        loading: true, // loading state
        key: "bpm", // current key for graph
        pos: 0, // current position
        max: 100, // default max bpm
        realtime: {
            bpm: 0,
        }
    },
    cnt: 9,
    beat: 1,
    run: false,

    init: function () {
        ew.face.appCurr = "HR"

        ew.UI.nav.next.replaceWith(() => {
            if (ew.UI.ntid) { clearTimeout(ew.UI.ntid); ew.UI.ntid = 0; }
            ew.sys.buzz.nav(ew.sys.buzz.type.ok);
            ew.apps.hr.state.def.page++;
            if (3 < ew.apps.hr.state.def.page) ew.apps.hr.state.def.page = 0;
            ew.face[0].mode(ew.apps.hr.state.def.page);
        });

        ew.UI.nav.back.replaceWith(() => {
            if (ew.UI.ntid) { clearTimeout(ew.UI.ntid); ew.UI.ntid = 0; }
            ew.sys.buzz.nav(ew.sys.buzz.type.ok);
            ew.apps.hr.state.def.page--;
            if (ew.apps.hr.state.def.page < 0) ew.apps.hr.state.def.page = 3;
            ew.face[0].mode(ew.apps.hr.state.def.page);
        });
        
        // Start real time HR monitor
        Bangle.setHRMPower(1, "ew");
        Bangle.on("HRM", this.hrmRT);
        
        ew.UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "HEART RATE", "", 15, 1);

        // UI control Start
        ew.UI.c.start(1, 1);
        ew.UI.c.end();

        this.run = true;
    },

    show: function () {
        if (!this.run) return;
        this.mode(ew.apps.hr.state.def.page || 0);

    },

    // Real-time HRM handler
    hrmRT: function (hrm) {
        let face = ew.face[0];
        if (!face || !face.run) return;

        if (face.tid1) {
            clearTimeout(face.tid1);
            face.tid1 = 0;
        }

        if (ew.apps.hr.state.def.page === 0) {
            face.data.realtime.bpm = hrm.bpm || 0;
            face.data.realtime.conf = hrm.confidence || 0;
            if (!hrm.bpm) {
                ew.face[0].anim();
            }
            face.tid1 = setTimeout(() => {
                ew.face[0].tid1 = 0;
                ew.UI.btn.i2l("main", "_main", 9, "WEAR PROPERLY", "", 15, 6, 1, 8);
            }, 3000);


            if (!ew.UI.ntid) face.dRTI();
        }
    },

    anim: function () {
        if (this.hr) clearTimeout(this.hr);
        this.hr = setTimeout(() => {
            this.hr = 0;
            this.cnt--;
            if (this.cnt < 8) { if (this.beat) { this.beat = 0; this.cnt = 13; return; } else { this.beat = 1; this.cnt = 11; } }
            ew.UI.btn.img("main", "_main", 9, "eW-HR.img", "MEASURING", 14, 6, 1.2 + (this.cnt / 10)); this.anim();

        }, 5);
    },
    mode: function (page) {
        ew.apps.hr.state.def.page = page;

        if (page === 0) {

            this.data.realtime = { bpm: 0 };
            this.data.loading = false;
            this.data.source = [];
            ew.UI.ele.ind(1, 4, 0, 15); // 1/4
            ew.UI.btn.c2l("main", "_header", 6, "LIVE VIEW", "", 15, 0, 1, 1);
            ew.UI.btn.i2l("main", "_main", 9, "STAY STILL", "", 15, 6, 1, 8);
            if (this.tid1) {
                clearTimeout(this.tid1);
                this.tid1 = 0;
            }

            this.tid1 = setTimeout(() => {
                this.tid1 = 0;
                ew.UI.btn.i2l("main", "_main", 9, "WEAR PROPERLY", "", 15, 4, 1, 8);
            }, 5000)
            //this.dRTI();
            this.bar();
            return;
        }

        if (this.hr) clearTimeout(this.hr);
        this.hr = 0;
        this.data.source = [];
        this.data.loading = true;


        ew.UI.btn.img("main", "_main", 9, "scan", "", 14, 1, 1.4);
        if (!ew.UI.ntid) ew.UI.ele.fill("_bar", 6, 0);

        let time = new Date();
        let period, length, type, title;

        if (page === 1) {
            ew.UI.ele.ind(2, 4, 0, 15); // 2/4
            title = "LAST 4 HOURS";
            period = "readDay";
            length = 24;
            type = "Date";
        }
        else if (page === 2) {
            ew.UI.ele.ind(3, 4, 0, 15); // 3/4
            title = "LAST 24 HOURS";
            period = "readDay";
            length = 138;
            type = "Date";
        }
        else if (page === 3) {
            ew.UI.ele.ind(4, 4, 0, 15); // 4/4
            title = "LAST 30 DAYS";
            period = "readDailySummaries";
            length = 30;
            type = "Month";
        }

        ew.UI.btn.c2l("main", "_header", 6, title, "", 15, 0, 1.1, 1);

        // create data source
        if (!this.data["source" + page]) {
            require("health")[period](time, (entry) => {
                if (entry) {
                    this.data.source.push({
                        bpm: entry.bpm,
                        bpmMin: entry.bpmMin,
                        bpmMax: entry.bpmMax,
                        hr: entry.day || entry.hr,
                        min: (entry.day ? time.toString().substr(4, 3) : entry.min)
                    });
                }
            });

            if (this.data.source.length < length) {
                let partOne = this.data.source;
                this.data.source = [];
                time["set" + type](time["get" + type]() - 1);

                require("health")[period](time, (entry) => {
                    if (entry) {
                        this.data.source.push({
                            bpm: entry.bpm,
                            bpmMin: entry.bpmMin,
                            bpmMax: entry.bpmMax,
                            hr: entry.day || entry.hr,
                            min: (entry.day ? time.toString().substr(4, 3) : entry.min)
                        });
                    }
                });
                this.data.source = this.data.source.concat(partOne);
                partOne = [];
            }
            if (this.data.source.length > length) {
                this.data.source = this.data.source.slice(-length);
            }
            // get average values
            if (page === 2) this.pHAV();

            // add last readings
            if (page === 3) {
                time = new Date();
                let now = Bangle.getHealthStatus("day");
                this.data.source.push({
                    bpm: now.bpm,
                    bpmMin: now.bpmMin,
                    bpmMax: now.bpmMax,
                    hr: time.getDate(),
                    min: time.toString().substr(4, 3)
                });
            }
            if (page === 1) {
                time = new Date();
                let now = Bangle.getHealthStatus();
                this.data.source.push({
                    bpm: now.bpm,
                    bpmMin: now.bpmMin,
                    bpmMax: now.bpmMax,
                    hr: time.getHours(),
                    min: Math.floor(time.getMinutes() / 10) * 10
                });
            }

            // save data source
            this.data["source" + page] = this.data.source;
        }
        // use saved data source
        else
            this.data.source = this.data["source" + page];

        this.pMax();
    },

    dRTI: function () {
        if (ew.apps.hr.state.def.page !== 0) return;
        let rt = this.data.realtime;
        let bpm = rt.bpm || 0;
        let conf = rt.conf || 0;

        if (bpm) {
            if (this.hr) { clearTimeout(this.hr); this.hr = 0; }
            ew.UI.btn.c2l("main", "_main", 9, bpm.toString(), "", 15, 90 < conf ? 4 : 1, 3, 8, "LECO1976Regular22");
        }
        this.uRTG(bpm, conf);
    },

    uRTG: function (bpm, conf) {
        if (!this.data.realtime.buffer) {

            this.data.realtime.buffer = new Uint8Array(14);
            this.data.realtime.bufferPos = 0;
            this.data.realtime.bufferFull = false;

            for (let i = 0; i < 14; i++) {
                this.data.realtime.buffer[i] = 0;
            }
        }

        // cyclic buffer
        this.data.realtime.buffer[this.data.realtime.bufferPos] = bpm;
        this.data.realtime.bufferPos = (this.data.realtime.bufferPos + 1) % 14;
        this.data.realtime.bufferFull = true; // Μετά την πρώτη εγγραφή, θεωρούμε ότι είναι γεμάτο

        // tempSource, new values go right
        let tempSource = [];

        // fill up 14 values
        for (let i = 0; i < 14; i++) {
            let idx = (this.data.realtime.bufferPos + i) % 14;
            tempSource.push({
                bpm: this.data.realtime.buffer[idx] || 0
            });
        }

        let originalSource = this.data.source;
        this.data.source = tempSource;

        let maxVal = 80;
        for (let i = 0; i < tempSource.length; i++) {
            if (tempSource[i].bpm > maxVal) maxVal = tempSource[i].bpm;
        }
        this.data.max = maxVal + 10;

        this.dRTG();

        this.data.source = originalSource;
    },

    pHAV: function () {
        let sums = new Uint16Array(24);
        let counts = new Uint8Array(24);
        let now = new Date();
        let currentHour = now.getHours();

        for (let i = 0; i < this.data.source.length; i++) {
            let entry = this.data.source[i];
            let hour = entry.hr;

            if (entry.bpm > 0) {
                sums[hour] += entry.bpm;
                counts[hour]++;
            }
        }

        let hourlyData = [];

        for (let offset = 23; offset >= 0; offset--) {
            let displayHour = (currentHour - offset + 24) % 24;
            hourlyData.push({
                bpm: (counts[displayHour] > 0) ? sums[displayHour] / counts[displayHour] | 0 : 0,
                hr: displayHour,
                min: 0,
                count: counts[displayHour]
            });
        }

        this.data.source = hourlyData;
    },

    pMax: function () {
        this.data.max = 60;
        for (let i = 0; i < this.data.source.length; i++) {
            if (this.data.source[i].bpm > this.data.max) {
                this.data.max = this.data.source[i].bpm;
            }
        }
        if (this.data.max < 60) this.data.max = 100;

        this.data.pos = this.data.source.length - 1;
        this.data.loading = false;

        this.bar();
        this.dG();
        this.dI();
    },

    dI: function () {
        if (ew.apps.hr.state.def.page === 0) return; // Το real-time έχει το δικό του draw
        if (this.data.loading || this.data.source.length === 0) {
            ew.UI.btn.i2l("main", "_main", 3, "NO DATA", "", 15, 1, 1);
            return;
        }

        let entry = this.data.source[this.data.pos];
        let bpmStr = entry.bpm.toString();
        ew.UI.btn.c2l("main", "_main", 3, bpmStr, "", 15, 6, 1, 8, "LECO1976Regular42");
        // Time
        let hours = entry.hr.toString().padStart(2, '0');
        let mins = entry.min.toString().padStart(2, '0');
        let timeStr = "time: " + hours + ":" + mins;
        ew.UI.btn.c2l("main", "_main", 6, timeStr, "", 15, 1, 18, 2, "Vector");
    },
 
   dG: function(update, newPos) {
        if (ew.UI.ntid) return;

        const margin = 2;
        const width = g.getWidth() - margin;
        const bottom = g.getHeight();
        const graphTop = 130;
        const graphHeight = 40;
        const fields = this.data.source.length;
        const space = 3;
        const topL = this.data.topL;
        const btmL = this.data.btmL;

        if (fields === 0) return;

        const MAX_BAR_WIDTH = 30;

        let bw, startX;
        if (fields * (MAX_BAR_WIDTH + space) <= width) {
            bw = MAX_BAR_WIDTH;
            let totalWidth = fields * (bw + space);
            startX = margin + (width - totalWidth) / 2;
        }
        else {
            bw = (width - (fields * space)) / fields;
            startX = margin;
        }

        // Scale for bars
        let scale = graphHeight / this.data.max;

        if (update) {
            let oldPos = this.data.posL; 
            newPos; 

            let oldX = startX + oldPos * (bw + space);
            let oldEntry = this.data.source[oldPos];
            let oldBarH = oldEntry.bpm * scale;

            let color = topL < oldEntry.bpm ? 13 : oldEntry.bpm < btmL ? 9 : 4;
            
            // revert old pos
            g.setCol(1, color);
            g.fillRect(oldX, graphTop + graphHeight - oldBarH, oldX + bw, graphTop + graphHeight);
            g.setCol(1, 0);
            g.fillRect(oldX, graphTop -5, oldX + bw, graphTop-2 );
            // highlight new pos
            let newX = startX + newPos * (bw + space);
            let newEntry = this.data.source[newPos];
            let newBarH = newEntry.bpm * scale;

            g.setCol(1, 15); // highlight color
            g.fillRect(newX, graphTop + graphHeight - newBarH, newX + bw, graphTop + graphHeight);
            g.fillRect(newX, graphTop -5, newX + bw, graphTop-2 );

        }
        else {

            // Draw bars
            for (let i = 0; i < fields; i++) {
                let entry = this.data.source[i];
                let barH = entry.bpm * scale;
                let x = startX + i * (bw + space);
                let isSelected = (i === this.data.pos);

                let color = topL < entry.bpm ? 13 : entry.bpm < btmL ? 9 : 4;

                g.setCol(1, isSelected ? 15 : color);
                if (isSelected) g.fillRect(x, graphTop -5, x + bw, graphTop-2 );
                g.fillRect(x, graphTop + graphHeight - barH, x + bw, graphTop + graphHeight);

            }
        }

        if (this.tid) clearTimeout(this.tid);
        this.tid = setTimeout(() => {
            this.tid = 0;
            this.dI()
        }, 25)

    },

    dRTG: function () {
        if (ew.UI.ntid) return;

        const margin = 2;
        const width = g.getWidth() - margin;
        const graphTop = 130;
        const graphHeight = 45;
        const fields = this.data.source.length; // 14
        const space = 3;
        const topL = this.data.topL;
        const btmL = this.data.btmL;

        if (fields === 0) return;

        const MAX_BAR_WIDTH = 30;

        let bw, startX;
        if (fields * (MAX_BAR_WIDTH + space) <= width) {
            bw = MAX_BAR_WIDTH;
            let totalWidth = fields * (bw + space);
            startX = margin + (width - totalWidth) / 2;
        }
        else {
            bw = (width - (fields * space)) / fields;
            startX = margin;
        }

        let scale = graphHeight / this.data.max;

        g.setCol(0, 0);
        g.fillRect(0, graphTop - 5, g.getWidth(), graphTop + graphHeight + 5);

        for (let i = 0; i < fields; i++) {
            let entry = this.data.source[i];
            let barH = entry.bpm * scale;
            let x = startX + i * (bw + space);
            let isSelected = (i === fields - 1);
            let color = topL < entry.bpm ? 13 : entry.bpm < btmL ? 9 : 4;

            g.setCol(1, isSelected ? 15 : color);
            g.fillRect(x, graphTop + graphHeight - barH, x + bw, graphTop + graphHeight);
        }
    },
    bar: function () {
        if (ew.is.UIpri || ew.UI.ntid) return;
        ew.UI.c.start(0, 1);
        ew.UI.c.end();

        if (ew.apps.hr.state.def.page === 0) {
            ew.is.slide = 0;
            this.dRTI();
            return;
        }

        ew.UI.ele.fill("_bar", 6, 0);
        if (!this.data.loading && this.data.source.length > 0) {
            ew.sys.TC.val = {
                cur: this.data.pos,
                dn: 0,
                up: this.data.source.length - 1,
                tmp: 0,
                reverce: 0,
                loop: 1
            };

            ew.UI.c.tcBar = (a, b) => {
                if (b >= 0 && b < this.data.source.length) {
                    this.data.posL = this.data.pos;
                    this.data.pos = b;
                    this.dG(true, b);
                }
            };

            ew.is.slide = 1;
            this.dG();
        }
        else if (!this.data.loading && this.data.source.length === 0) {
            ew.UI.btn.i2l("main", "_main", 9, "NO DATA", "", 15, 1, 1.3);
        }

    },

    clear: function (o) {
        ew.is.slide = 0;
        if (this.tid) clearTimeout(this.tid);
        this.tid = 0;
        if (this.hr) clearTimeout(this.hr);
        this.hr = 0;
        if (this.tid1) clearTimeout(this.tid1);
        this.tid1 = 0;
        Bangle.setHRMPower(0,"ew");
        Bangle.removeListener("HRM", ew.face[0].hrmRT);
        return true;
    },

    off: function (o) {
        g.off();
    }
};


ew.face[0].init();
ew.face[0].show();


// settings


ew.face[1] = {
    run: false,
    init: function() {
        ew.face.appCurr = "HR-set";

        ew.UI.nav.next.replaceWith(() => {
        ew.sys.buzz.nav(ew.sys.buzz.type.na);
        });
        ew.UI.nav.back.replaceWith(() => {
            ew.sys.buzz.nav(ew.sys.buzz.type.na);
        });

        this.data = Object.assign({
            hrm: 0,
            stepGoal: 10000,
            stepGoalNotification: false
        }, require("Storage").readJSON("health.json", true) || {});
        
        this.dataString=["OFF","3","10","ALL"]
        this.page = 1;
        this.page1();
        this.bar();
    },
    show: function(o) {},
    page1: function(batt, id) {
        this.page = 1;
        // header
        ew.UI.ele.ind(0, 0, 0, 0);
        ew.UI.ele.fill("_main", 12, 0);

        ew.UI.c.start(1, 1);
        ew.UI.btn.c2l("main", "_2x3", 1, "AUTO", this.dataString[this.data.hrm], 15, this.data.hrm ? 4 : 1);
        ew.UI.btn.c2l("main", "_2x3", 2, "MAX", ew.apps.hr.state.def.topL, 15, 6);
        ew.UI.btn.c2l("main", "_2x3", 3, "MIN", ew.apps.hr.state.def.btmL, 15, 6);
        ew.UI.c.end();

        ew.UI.c.main._2x3 = (i) => {
            if (i == 1) {
                ew.sys.buzz.nav(ew.sys.buzz.type.ok);
                let txt=["OFF","EVERY 3 MIN","EVERY 10 MIN","ALLWAYS ON"]
                this.data.hrm++;
                if (3 < this.data.hrm) this.data.hrm=0;
                
                ew.UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "HRM MODE", txt[this.data.hrm], 0, 15);
                ew.UI.btn.c2l("main", "_2x3", 1, "AUTO", this.dataString[this.data.hrm], 15, this.data.hrm ? 4 : 6);
            }
            else if (i == 2) {
                ew.sys.buzz.nav(ew.sys.buzz.type.ok);
                ew.UI.btn.ntfy(1, 3, 0, "_bar", 6, "< TOP LIMMIT >", "", 15, 6, 1);
                ew.is.slide = 1;
                ew.sys.TC.val = { cur: ew.apps.hr.state.def.topL, dn: 80, up: 140, tmp: 0, fire: 1 };
                ew.UI.c.tcBar = (a, b, r) => {
                    ew.UI.btn.ntfy(0, 2, 1);
                    if (11 < r && ew.sys.TC.val.dn < val && val < ew.sys.TC.val.up) val = val + (a * (20 < r ? 10 : 5));
                    else val = b;
                    ew.sys.TC.val.cur = val;
                    ew.apps.hr.state.def.topL = val;
                    ew.UI.btn.c2l("main", "_2x3", 2, "MAX", ew.apps.hr.state.def.topL, 15, 6);
                };
            }
            else if (i == 3) {
                ew.sys.buzz.nav(ew.sys.buzz.type.ok);
                ew.UI.btn.ntfy(1, 3, 0, "_bar", 6, "< BTM LIMMIT >", "", 15, 6, 1);
                ew.is.slide = 1;
                ew.sys.TC.val = { cur: ew.apps.hr.state.def.btmL, dn: 40, up:80, tmp: 0, fire: 1 };
                ew.UI.c.tcBar = (a, b, r) => {
                    ew.UI.btn.ntfy(0, 2, 1);
                    if (11 < r && ew.sys.TC.val.dn < val && val < ew.sys.TC.val.up) val = val + (a * (20 < r ? 10 : 5));
                    else val = b;
                    ew.sys.TC.val.cur = val;
                    ew.apps.hr.state.def.btmL = val;
                    ew.UI.btn.c2l("main", "_2x3", 3, "MIN", ew.apps.hr.state.def.btmL, 15, 6);
                };
            }
        };
    },
    bar: function() {
        ew.is.bar = 0;
        ew.UI.c.start(0, 1);
        ew.UI.c.end();
        ew.UI.ele.fill("_bar", 6, 0);
        ew.UI.btn.img("bar", "_bar", 6, ew.face.app+".img", "SETTINGS", 15, 0, 0.8, 1, 1);

    },
    clear: function(o) {
        ew.is.slide = 0;
        if (this.tid) clearTimeout(this.tid);
        this.tid = 0;
        if (this.data) require("Storage").writeJSON("health.json", this.data);
        return true;
    },
    off: function(o) {
        g.off();
    }
};
