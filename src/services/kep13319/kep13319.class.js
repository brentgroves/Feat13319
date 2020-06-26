/* eslint-disable no-unused-vars */
exports.Kep13319 = class Kep13319 {
  constructor(options) {
    this.options = options || {};
    this.messages =[];
    this.nodes = [
      {
        PrimaryKey: 1,
        NodeId: 'ns=2;s=CNC103.CNC103.CNC103.PartCounter',
        Plexus_Customer_No: '310507',
        PCN: 'Avilla',
        Workcenter_Key: '61420',
        Workcenter_Code: 'CNC103',
        CNC: '103',
        Cycle_Counter_Shift_SL: 0,
        TransDate: '2020-06-26 09:41:50'
      },
      {
        PrimaryKey:2,
        NodeId: 'ns=2;s=CNC422.CNC422.CNC422.PartCounter',
        Plexus_Customer_No: '310507',
        PCN: 'Avilla',
        Workcenter_Key: '99999',
        Workcenter_Code: 'CNC422',
        CNC: '422',
        Cycle_Counter_Shift_SL: 0,
        TransDate: '2020-06-26 09:41:50'
      },
    ];
  }

  async find(params) {
    return this.nodes;
  }
  async update (id, data, params) {
    let newNode = {
      PrimaryKey:data.PrimaryKey,
      NodeId: data.NodeId,
      Plexus_Customer_No: data.NodeId,
      PCN: data.PCN,
      Workcenter_Key: data.Workcenter_Key,
      Workcenter_Code: data.Workcenter_Code,
      CNC: data.CNC,
      Cycle_Counter_Shift_SL: data.Cycle_Counter_Shift_SL,
      TransDate: data.TransDate
    };    
    let msg = JSON.stringify(data);
    console.log(`id=>${id}, data=>${msg}`);

    // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
    this.nodes[id]=newNode;
    /*
    this.nodes.map(oldNode => {
      if(newNode.PrimaryKey === oldNode.PrimaryKey){
        return newNode;
      } else {
        return oldNode;
      }
    });
    */
    return data;
  }
/* 
I DONT WANT TO USE CREATE BECAUSE I WANT TO BE KNOW THE INDEX OF
EVERY ARRAY ELEMENT SO IT CAN BE QUICKLY REPLACED WITH NEW
DATA USING THE UPDATE METHOD
*/
  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text,
    };
    // Add new message to the list
    this.messages.push(message);

    return message;
  }
};
/*
class Kep13318 {
  constructor() {
    this.messages = [];
  }

  async find() {
    // Just return all our messages
    return this.messages;
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text,
    };

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

NOT IMPLEMENTED
  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }


*/
