import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import UndoIcon from '@mui/icons-material/Undo';
import logo from '../logos/logo.jpg';
import photos from '../photosdata';
import './Jigsaw.css';

const DIFFICULTIES = {
  easy: { label: 'Easy', rows: 3, cols: 3, description: '9 pieces' },
  medium: { label: 'Medium', rows: 4, cols: 4, description: '16 pieces' },
  hard: { label: 'Hard', rows: 6, cols: 6, description: '36 pieces' },
};

const allPhotos = Object.values(photos);

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createPieces(rows, cols) {
  const pieces = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      pieces.push({
        id: row * cols + col,
        correctRow: row,
        correctCol: col,
        placedRow: null,
        placedCol: null,
        locked: false,
      });
    }
  }
  return pieces;
}

function isPuzzleComplete(pieces) {
  return pieces.every(
    (p) =>
      p.locked &&
      p.placedRow === p.correctRow &&
      p.placedCol === p.correctCol
  );
}

function clonePieces(pieces) {
  return pieces.map((p) => ({ ...p }));
}

function JigsawBoard({ imageSrc, rows, cols, onCompletionChange }) {
  const boardRef = useRef(null);
  const dragState = useRef(null);
  const trayOrderRef = useRef([]);
  const historyRef = useRef([]);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pieces, setPieces] = useState(() => createPieces(rows, cols));
  const [canUndo, setCanUndo] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const pieceWidth = boardSize.width / cols;
  const pieceHeight = boardSize.height / rows;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = Math.min(window.innerWidth - 48, 560);
      const maxHeight = Math.min(window.innerHeight - 320, 420);
      const aspect = img.naturalWidth / img.naturalHeight;

      let width = maxWidth;
      let height = width / aspect;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspect;
      }

      setBoardSize({ width, height });
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    const initial = createPieces(rows, cols);
    setPieces(initial);
    trayOrderRef.current = shuffleArray(initial.map((p) => p.id));
    historyRef.current = [];
    setCanUndo(false);
  }, [rows, cols, imageSrc]);

  useEffect(() => {
    onCompletionChange(isPuzzleComplete(pieces));
  }, [pieces, onCompletionChange]);

  const applyMove = useCallback((computeNext) => {
    setPieces((prev) => {
      const next = computeNext(prev);
      if (next === prev) return prev;

      historyRef.current.push(clonePieces(prev));
      setCanUndo(true);
      return next;
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (historyRef.current.length === 0) return;

    const previous = historyRef.current.pop();
    setCanUndo(historyRef.current.length > 0);
    setPieces(previous);
    setDraggingId(null);
    dragState.current = null;
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo]);

  const getCellFromPoint = useCallback(
    (clientX, clientY) => {
      const board = boardRef.current;
      if (!board || !pieceWidth || !pieceHeight) return null;

      const rect = board.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;

      const col = Math.floor(x / pieceWidth);
      const row = Math.floor(y / pieceHeight);

      if (row >= rows || col >= cols) return null;
      return { row, col };
    },
    [pieceWidth, pieceHeight, rows, cols]
  );

  const tryPlacePiece = useCallback(
    (pieceId, row, col) => {
      applyMove((prev) => {
        const piece = prev.find((p) => p.id === pieceId);
        if (!piece || piece.locked) return prev;

        const occupant = prev.find(
          (p) => p.placedRow === row && p.placedCol === col && p.id !== pieceId
        );

        if (occupant && occupant.locked) return prev;

        let next = prev.map((p) => {
          if (p.id === pieceId) {
            const isCorrect = row === p.correctRow && col === p.correctCol;
            return {
              ...p,
              placedRow: row,
              placedCol: col,
              locked: isCorrect,
            };
          }
          if (occupant && p.id === occupant.id) {
            return {
              ...p,
              placedRow: piece.placedRow,
              placedCol: piece.placedCol,
              locked: false,
            };
          }
          return p;
        });

        next = next.map((p) => {
          if (
            p.placedRow !== null &&
            p.placedCol !== null &&
            p.placedRow === p.correctRow &&
            p.placedCol === p.correctCol
          ) {
            return { ...p, locked: true };
          }
          return p;
        });

        return next;
      });
    },
    [applyMove]
  );

  const returnToTray = useCallback((pieceId) => {
    applyMove((prev) => {
      const piece = prev.find((p) => p.id === pieceId);
      if (!piece || piece.locked || piece.placedRow === null) return prev;

      return prev.map((p) =>
        p.id === pieceId
          ? { ...p, placedRow: null, placedCol: null, locked: false }
          : p
      );
    });
  }, [applyMove]);

  const handlePointerDown = useCallback(
    (e, pieceId) => {
      const piece = pieces.find((p) => p.id === pieceId);
      if (!piece || piece.locked) return;

      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      dragState.current = { pieceId, pointerId: e.pointerId };
      setDraggingId(pieceId);
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragPosition({ x: e.clientX, y: e.clientY });
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [pieces]
  );

  const handlePointerMove = useCallback((e) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    setDragPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;

      const { pieceId } = dragState.current;
      const cell = getCellFromPoint(e.clientX, e.clientY);

      if (cell) {
        tryPlacePiece(pieceId, cell.row, cell.col);
      } else {
        const tray = document.querySelector('.jigsaw-tray');
        if (tray) {
          const rect = tray.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            returnToTray(pieceId);
          }
        }
      }

      dragState.current = null;
      setDraggingId(null);
    },
    [getCellFromPoint, tryPlacePiece, returnToTray]
  );

  const trayPieces = useMemo(() => {
    const inTray = pieces.filter((p) => !p.locked && p.placedRow === null);
    const order = trayOrderRef.current;
    const orderIndex = new Map(order.map((id, index) => [id, index]));

    return [...inTray].sort(
      (a, b) => (orderIndex.get(a.id) ?? order.length) - (orderIndex.get(b.id) ?? order.length)
    );
  }, [pieces]);

  const placedPieces = useMemo(
    () => pieces.filter((p) => p.placedRow !== null),
    [pieces]
  );

  const renderPiece = (piece, isDragging = false) => (
    <div
      key={piece.id}
      className={`jigsaw-piece${isDragging ? ' jigsaw-piece--dragging' : ''}`}
      style={{
        width: pieceWidth,
        height: pieceHeight,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
        backgroundPosition: `-${piece.correctCol * pieceWidth}px -${piece.correctRow * pieceHeight}px`,
      }}
      onPointerDown={(e) => handlePointerDown(e, piece.id)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label={`Puzzle piece ${piece.id + 1}`}
    />
  );

  if (!imageLoaded) {
    return <Box className="jigsaw-loading">Loading puzzle...</Box>;
  }

  const draggingPiece = draggingId !== null ? pieces.find((p) => p.id === draggingId) : null;

  return (
    <Box className="jigsaw-game">
      <Box className="jigsaw-board-toolbar">
        <Button
          size="small"
          variant="outlined"
          className="jigsaw-undo-btn"
          startIcon={<UndoIcon />}
          onClick={handleUndo}
          disabled={!canUndo}
        >
          Undo
        </Button>
      </Box>

      <Box
        className="jigsaw-board"
        ref={boardRef}
        style={{ width: boardSize.width, height: boardSize.height }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          return (
            <div
              key={`slot-${row}-${col}`}
              className="jigsaw-slot"
              style={{
                width: pieceWidth,
                height: pieceHeight,
                left: col * pieceWidth,
                top: row * pieceHeight,
              }}
            />
          );
        })}

        {placedPieces.map((piece) => (
          <div
            key={`placed-${piece.id}`}
            className={`jigsaw-piece jigsaw-piece--placed${piece.locked ? ' jigsaw-piece--locked' : ''}`}
            style={{
              width: pieceWidth,
              height: pieceHeight,
              left: piece.placedCol * pieceWidth,
              top: piece.placedRow * pieceHeight,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
              backgroundPosition: `-${piece.correctCol * pieceWidth}px -${piece.correctRow * pieceHeight}px`,
              opacity: draggingId === piece.id ? 0.3 : 1,
            }}
            onPointerDown={piece.locked ? undefined : (e) => handlePointerDown(e, piece.id)}
            onPointerMove={piece.locked ? undefined : handlePointerMove}
            onPointerUp={piece.locked ? undefined : handlePointerUp}
          />
        ))}
      </Box>

      <Box className="jigsaw-tray">
        <Typography variant="body2" className="jigsaw-tray-label">
          Drag pieces onto the board
        </Typography>
        <Box className="jigsaw-tray-pieces">
          {trayPieces.map((piece) => renderPiece(piece, draggingId === piece.id))}
        </Box>
      </Box>

      {draggingPiece && (
        <div
          className="jigsaw-piece jigsaw-piece--floating"
          style={{
            width: pieceWidth,
            height: pieceHeight,
            left: dragPosition.x - dragOffset.x,
            top: dragPosition.y - dragOffset.y,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
            backgroundPosition: `-${draggingPiece.correctCol * pieceWidth}px -${draggingPiece.correctRow * pieceHeight}px`,
          }}
        />
      )}
    </Box>
  );
}

export default function Jigsaw() {
  const { photoIndex } = useParams();
  const navigate = useNavigate();
  const index = parseInt(photoIndex, 10);
  const imageSrc = Number.isNaN(index) || index < 0 || index >= allPhotos.length
    ? null
    : allPhotos[index];

  const [phase, setPhase] = useState('difficulty');
  const [difficulty, setDifficulty] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!imageSrc) {
      navigate('/photo', { replace: true });
    }
  }, [imageSrc, navigate]);

  const handleSelectDifficulty = (key) => {
    setDifficulty(key);
    setPhase('playing');
    setCompleted(false);
  };

  const handleCompletionChange = useCallback((isComplete) => {
    setCompleted(isComplete);
  }, []);

  const handlePlayAgain = () => {
    setPhase('difficulty');
    setDifficulty(null);
    setCompleted(false);
  };

  if (!imageSrc) return null;

  const config = difficulty ? DIFFICULTIES[difficulty] : null;

  return (
    <Box className="jigsaw-page">
      <AppBar position="static" className="jigsaw-header" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => navigate('/photo')}
            aria-label="back to gallery"
            sx={{ color: '#C8ACD6', mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#C8ACD6' }}>
            Jigsaw Puzzle
          </Typography>
          <IconButton color="inherit" href="/home" aria-label="home" sx={{ color: '#C8ACD6' }}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className="jigsaw-content">
        {phase === 'difficulty' && (
          <Box className="jigsaw-difficulty">
            <ExtensionIcon className="jigsaw-difficulty-icon" />
            <Typography variant="h5" className="jigsaw-difficulty-title">
              Choose Difficulty
            </Typography>
            <Typography variant="body2" className="jigsaw-difficulty-subtitle">
              Select how many pieces you want to solve
            </Typography>
            <Box className="jigsaw-preview">
              <img src={imageSrc} alt="Puzzle preview" />
            </Box>
            <Box className="jigsaw-difficulty-buttons">
              {Object.entries(DIFFICULTIES).map(([key, { label, description }]) => (
                <Button
                  key={key}
                  variant="contained"
                  className={`jigsaw-difficulty-btn jigsaw-difficulty-btn--${key}`}
                  onClick={() => handleSelectDifficulty(key)}
                >
                  <span className="jigsaw-difficulty-btn-label">{label}</span>
                  <span className="jigsaw-difficulty-btn-desc">{description}</span>
                </Button>
              ))}
            </Box>
          </Box>
        )}

        {phase === 'playing' && config && (
          <>
            <Box className="jigsaw-game-header">
              <Typography variant="body1" className="jigsaw-game-info">
                {config.label} · {config.description}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                className="jigsaw-change-difficulty"
                onClick={handlePlayAgain}
              >
                Change difficulty
              </Button>
            </Box>

            <JigsawBoard
              key={difficulty}
              imageSrc={imageSrc}
              rows={config.rows}
              cols={config.cols}
              onCompletionChange={handleCompletionChange}
            />

            {completed && (
              <Box className="jigsaw-win-overlay">
                <Box className="jigsaw-win-card">
                  <Typography variant="h5">Puzzle complete!</Typography>
                  <img src={imageSrc} alt="Completed puzzle" className="jigsaw-win-image" />
                  <Box className="jigsaw-win-actions">
                    <Button variant="contained" onClick={handlePlayAgain}>
                      Play again
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/photo')}>
                      Back to gallery
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
