const contextMenuArr = ({ 
  setStaticKey, 
  dispatchDialogues, 
  selectDialogue, 
  setSelectDialogue, 
  setContextMenuStatus 
}) => {
  return [
    {
      title: 'Set StaticKey',
      function: () => { setStaticKey(prompt("input staticKey").toString()) }
    },
    {
      title: 'Remove dialogue',
      function: () => {
        dispatchDialogues({ type: 'DELETE_DIALOGUE', receiver: selectDialogue.user })
        setSelectDialogue({
          status: false,
          user: null
        });
        setContextMenuStatus(false)
      }
    }
  ]
};

export default contextMenuArr;