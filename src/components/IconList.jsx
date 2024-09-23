import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { icons, Smile } from 'lucide-react';
import { iconList } from '@/constants/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios';

const BASE_URL='https://logoexpress.tubeguruji.com'
function IconList({selectedIcon}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [pngIconList, setPngIconList]=useState([]);
  const storageValue = JSON.parse(localStorage.getItem('value'));
  const [icon,setIcon]=useState(storageValue?storageValue?.icon:'smile');

  useEffect(()=>{
    getPngIcons();
  },[])
  

  const Icon = ({ name, color, size }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) return null;

    return (
      <LucidIcon
        color={color}
        size={size}
      />
    );
  };

  const getPngIcons=()=>{
    axios.get(BASE_URL+'/getIcons.php').then(resp=>{
      console.log(resp.data);
      setPngIconList(resp.data);
    })
  }
  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className='p-3 cursor-pointer bg-gray-200 rounded-md my-2 w-[50px] h-[50px] flex items-center justify-center'>
            {icon?.includes('.png')?
            <img src={BASE_URL+'/png'+icon}/>:
            <Icon name={icon} color={'#000'} size={20} />
            }
          
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Favourite Icon</DialogTitle>
            <DialogDescription>

              <Tabs defaultValue="Icons" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="Icons">Icons</TabsTrigger>
                <TabsTrigger value="Color-icons">Color Icons</TabsTrigger>
              </TabsList>
              <TabsContent value="Icons">
              <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                {iconList.map((icon, index) => (
                  <div 
                  key={index}
                  className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                  onClick={()=>{selectedIcon(icon);setOpenDialog(false);
                    setIcon(icon)
                  }}>
                    <Icon name={icon} color={'#000'} size={20} />
                  </div>
                ))}
              </div>
              </TabsContent>
              <TabsContent value="Color-icons">
              <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                {pngIconList.map((icon, index) => (
                  <div 
                  key={index}
                  className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                  onClick={()=>{selectedIcon(icon);setOpenDialog(false);
                    setIcon(icon)
                  }}>
                    <img src={BASE_URL+"/png/"+icon}/>
                  </div>
                ))}
              </div>
              </TabsContent>
            </Tabs>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconList;
