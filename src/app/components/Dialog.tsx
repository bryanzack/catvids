import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { dialogAtom } from '../state/atoms';
import { useAtom } from 'jotai';
import VideoData from './VideoData';
import { getMetadata, getThumbnails } from 'video-metadata-thumbnails';
import { useEffect, useRef, useState } from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import { IThumbnail } from 'video-metadata-thumbnails/lib/video/ithumbnail';
import Image from 'next/image';
import ReactPlayer from 'react-player';

export type Thumbnails = Thumbnail[]

export interface Thumbnail {
  currentTime: number
  blob: Blob
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ files }: {files: File[]}) {
  const url = URL.createObjectURL(files[0])
  const [loading, setLoading] = useState(true);
  const [imgs, setImgs] = useState<string[]>([])
  const thumb = useRef<IThumbnail[]>([])
  const range = useRef<{start: number, end: number}>({start: 0, end: 0});
  const [meta, setMeta] = useState<{duration: number, height: number, width: number}|null>(null);  
  const [open, setOpen] = useAtom(dialogAtom);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = (e: ChangeResult) => {
      range.current = {start: e.min, end: e.max};
  }

  useEffect(() => {  
    getMetadata(files[0]).then((r => {
      setMeta(r)
      range.current = {start: 0, end: r.duration}
      console.log(r);
    }));
    getThumbnails(files[0], {start: 0, quality: 0.5}).then((r) => {
      setLoading(false);
    });
  }, [])

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {files[0].name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {loading && <p>loading</p>}
          {!loading && 
            <div>
              <div className='flex flex-col items-center justify-center'>
                <ReactPlayer 
                  url={url} 
                  
                  />
              </div>
              <Typography>
                {meta &&
                  <MultiRangeSlider
                    min={0}
                    max={meta.duration}
                    step={0.1}
                    minValue={0}
                    maxValue={meta.duration}
                    ruler={false}
                    onInput={(e: ChangeResult) => {
                      handleInput(e);
                    }}
                    onChange={(e: ChangeResult) => {
                      range.current = {start: e.min, end: e.max}                  
                    }}

                    />
                }
              </Typography>
              <Typography>
            
              </Typography>
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}