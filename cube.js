//CORNER AND EDGE ORDER -->
//0.URF 1.UFL 2.ULB 3.UBR 4.DFR 5.DLF 6.DBL 7.DRB
//0.UR 1.UF 2.UL 3.UB 4.DR 5.DF 6.DL 7.DB 8.FR 9.FL 10.BL 11.BR

class Cube {
    constructor(corners, edges) {
        if (arguments.length === 2) {
            this.corners = corners;
            this.edges = edges;
            this.updateCS()
        } else {
            //this.cubie = [['URF0', 'UFL0', 'ULB0', 'UBR0', 'DFR0', 'DLF0', 'DRB0'], ['UR0', 'UF0', 'UL0', 'UB0', 'DR0', 'DF0', 'DL0', 'DB0', 'FR0', 'FL0', 'BL0', 'BR0']]
            this.corners = [[0, 0], [1, 0], [2, 0], [3, 0], [4,0], [5,0], [6,0], [7,0]];
            this.edges = [[0, 0], [1, 0], [2, 0], [3, 0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0], [10,0], [11,0]];
            this.cs = [0, 0, 0, 0];
        }
    }
    
    updateCS() {
        this.cs = [0, 0, 0, 0];
        console.log(this.cubie + "\nturned into\n" + this.cs);
    }

    permute(c, e, turns) {
        var corners = this.corners;
        var face = [corners[c[0]], corners[c[1]], corners[c[2]], corners[c[3]]];
        for (let i=0; i<4; i++)
            corners[c[i]] = face[(4 + i - turns) % 4];

        var edges = this.edges;
        face = [edges[e[0]], edges[e[1]], edges[e[2]], edges[e[3]]];
        for (let i=0; i<4; i++)
            edges[e[i]] = face[(4 + i - turns) % 4];
    }

    f(turns) {
        const fCorners = [1, 0, 4, 5];
        const fEdges = [1, 8, 5, 9];
        this.permute(fCorners, fEdges, turns);
        
        if(turns !==2) {
            for (let i=0; i<4; i++)
                this.corners[fCorners[i]][1] = (this.corners[fCorners[i]][1] + 2 - (i % 2)) % 3;
            for (let i=0; i<4; i++)
                this.edges[fEdges[i]][1] = (this.edges[fEdges[i]][1] + 1) % 2;
        }
    }

    b(turns) {
        const bCorners = [3, 2, 6, 7];
        const bEdges= [3, 10, 7, 11];
        this.permute(bCorners, bEdges, turns);

        if(turns !==2) {
            for (let i=0; i<4; i++)
                this.corners[bCorners[i]][1] = (this.corners[bCorners[i]][1] + 2 - (i % 2)) % 3;
            for (let i=0; i<4; i++)
                this.edges[bEdges[i]][1] = (this.edges[bEdges[i]][1] + 1) % 2;
        }
    }

    r(turns) {
        const rCorners = [0, 3, 7, 4];
        const rEdges = [0, 11, 4, 8];
        this.permute(rCorners, rEdges, turns);

        if(turns !==2) {
            for (let i=0; i<4; i++)
                this.corners[rCorners[i]][1] = (this.corners[rCorners[i]][1] + 2 - (i % 2)) % 3;
        }
    }

    l(turns) {
        const lCorners = [2, 1, 5, 6];
        const lEdges = [2, 9, 6, 10];
        this.permute(lCorners, lEdges, turns);

        if(turns !==2) {
            for (let i=0; i<4; i++)
                this.corners[lCorners[i]][1] = (this.corners[lCorners[i]][1] + 2 - (i % 2)) % 3;
        }
    }

    u(turns) {
        const uCorners = [2, 3, 0, 1];
        const uEdges = [3, 0, 1, 2];
        this.permute(uCorners, uEdges, turns);
    }

    d(turns) {
        const dCorners = [5, 4, 7, 6];
        const dEdges = [5, 4, 7, 6];
        this.permute(dCorners, dEdges, turns);
    }

    alg(str) {
        const series = str.split(' ');
        for (let i=0; i<series.length; i++) {
            var turns = 1;
            if(series[i].length == 2) {
                if(series[i].charAt(1) == "2")
                    turns = 2;
                else
                    turns = -1;
            }

            switch(series[i].charAt(0).toUpperCase()) {
                case 'F':
                    cube.f(turns);
                    break;
                case 'B':
                    cube.b(turns);
                    break;
                case 'R':
                    cube.r(turns);
                    break;
                case 'L':
                    cube.l(turns);
                    break;
                case 'U':
                    cube.u(turns);
                    break;
                case 'D':
                    cube.d(turns);
                    break;
            }
        }
    }
}