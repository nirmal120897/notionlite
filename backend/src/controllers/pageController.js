import Page from "../models/pageModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create a new page
// @route   POST /api/pages
// @access  Private
export const createPage = asyncHandler(async (req, res) => {
  const { pagename, pagecontent } = req.body;
  const userId = req.user.userId;

  const page = await Page.create({
    pagename: pagename?.trim() || "Untitled",
    pagecontent: pagecontent || {},
    userId,
  });

  res.status(201).json({
    success: true,
    message: "Page created successfully",
    data: page,
  });
});

// @desc    Get all pages for logged-in user
// @route   GET /api/pages
// @access  Private
export const getPages = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  // Pipeline aggregation - user details lookup without mongoose populate
  const pages = await Page.aggregate([
    {
      $match: { userId },
    },
    {
      $sort: { updatedAt: -1 },
    },
  ]);

  res.status(200).json({
    success: true,
    count: pages.length,
    data: pages,
  });
});

// @desc    Get single page by pageId
// @route   GET /api/pages/:pageId
// @access  Private
export const getPageById = asyncHandler(async (req, res) => {
  const { pageId } = req.params;
  const userId = req.user.userId;

  const page = await Page.findOne({ pageId, userId });

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  res.status(200).json({
    success: true,
    data: page,
  });
});

// @desc    Update a page (title / content)
// @route   PUT /api/pages/:pageId
// @access  Private
export const updatePage = asyncHandler(async (req, res) => {
  const { pageId } = req.params;
  const userId = req.user.userId;
  const { pagename, pagecontent } = req.body;

  const page = await Page.findOne({ pageId, userId });

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  if (pagename !== undefined) {
    page.pagename = pagename;
  }

  if (pagecontent !== undefined) {
    page.pagecontent = pagecontent;
    page.markModified("pagecontent"); // Needed for Mixed types in Mongoose
  }

  const updatedPage = await page.save();

  res.status(200).json({
    success: true,
    message: "Page updated successfully",
    data: updatedPage,
  });
});

// @desc    Delete a page
// @route   DELETE /api/pages/:pageId
// @access  Private
export const deletePage = asyncHandler(async (req, res) => {
  const { pageId } = req.params;
  const userId = req.user.userId;

  const page = await Page.findOneAndDelete({ pageId, userId });

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  res.status(200).json({
    success: true,
    message: "Page deleted successfully",
    data: { pageId },
  });
});
