import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getData() {
    const text = readFileSync('status.log', 'utf-8');
    // const temporal = text.split('\n');
    const temporal = text.split('\r\n');
    const odata = { data: [], date: '' };
    odata.date = temporal[1].split(',')[1];
    const irt = temporal.indexOf('ROUTING TABLE');
    //para validar apellidos como "De La Cruz"
    const options = ['bluelabel', 'mib', 'lu', 'panama', 'vpn'];
    for (let i = 3; i < irt; i++) {
      const arr = temporal[i].split(',');
      let name = arr[0].split('-')[0];
      if (arr[0].split('-')[0] === 'UNDEF') continue;
      let arrName = arr[0].split('-');
      //console.log(arrName)
      let lastName = '';
      if (arrName[0] === 'UNDEF') lastName = 'UNDEF';
      else {
        lastName = arrName[1].charAt(0).toUpperCase() + arrName[1].slice(1);
        for (let j = 2; j < arrName.length; j++) {
          if (options.includes(arrName[j])) break;
          lastName =
            lastName +
            ' ' +
            arrName[j].charAt(0).toUpperCase() +
            arrName[j].slice(1);
        }
      }
      let oarr = {
        userName: {
          commonName: arr[0],
          name: name.charAt(0).toUpperCase() + name.slice(1),
          lastName,
        },
        isConnected: true,
        realAddress: arr[1],
        bytesReceived: arr[2],
        bytesSent: arr[3],
        connectedSince: arr[4],
        virtualAddress: '',
        lastRef: '',
      };
      odata.data.push(oarr);
    }
    for (let i = irt + 2; i < temporal.length - 4; i++) {
      let arr = temporal[i].split(',');
      if (arr[1] === 'UNDEF') continue;
      var oselect = odata.data.find((item) => {
        return (
          item.userName.commonName === arr[1] && item.realAddress === arr[2]
        );
      });

      oselect.virtualAddress = arr[0];
      oselect.lastRef = arr[3];
    }
    // console.log(irt - 3, temporal.length - irt - 6);
    // console.log(odata);
    return odata;
  }
}
