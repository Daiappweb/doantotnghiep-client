import ShoesItem from "@/components/share-components/shoes/ShoesItem";
import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { authService } from "@/service/auth.service";
import { animateScroll as scroll } from "react-scroll";
function SearchPage() {
  const [filter, setFilter] = useState(1);
  const [data, setData] = useState([]);
  const [pageAble, setPageAble] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [keyword, setKeyword] = useState("");
  const [optionSearch,setOptionSearch] = useState(1);
  const handleChangePage = (event, value) => {
    scroll.scrollToTop({ duration: 500, delay: 10 });
    setPage(value);
  };

  const loadSearch = async (keyword) => {
    console.log("keyword === ", keyword);
    const res = await authService.searchProductByName(keyword);
    console.log("data == ", res);
    setData(res);
  };

  //tích hợp tìm kiếm bằng giọng nói
  const [message, setMessage] = useState("");

  const handleRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const grammar = "#JSGF V1.0;";
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = "vi-VN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const lastResult = event.results.length - 1;
      const content = event.results[lastResult][0].transcript;
      setMessage("Voice Input: " + content + ".");
      setOptionSearch(2);
      setKeyword(content);
      loadSearch(content);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      setMessage("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
         
          value={keyword}
          sx={{ width: "50%", marginRight: 4 }}
          onChange={(event) => setKeyword(event.target.value)}
        ></TextField>
        <Button variant="contained" sx={{marginRight:4}} onClick={() => loadSearch(keyword)}>Tìm kiếm</Button>
        <Button variant="contained" id="btnTalk" onClick={handleRecognition}>Nhấp để nói</Button>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt={8} mb={3}>
        <Typography sx={{ fontSize: 24 }}>
          Kết quả tìm kiếm được: {data.length}
        </Typography>
      </Box>
      <Grid container spacing={2} width="100%">
        {data.map((item) => (
          <Grid key={item.id} item xs={6} md={3}>
            <ShoesItem shoes={item} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" width="100%" mt={8}>
        <Pagination
          size="large"
          count={pageAble.totalPage}
          page={page}
          onChange={handleChangePage}
          color="secondary"
        />
      </Box>
    </Box>
  );
}
export default SearchPage;
